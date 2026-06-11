import type { ToolSupportStatus } from '../common/types/providerSettings.js';

import { fetchWithTimeout } from '../utils/fetch.js';
import { validateHttpUrl } from '../utils/url.js';
import { sanitizeString } from '../utils/sanitize.js';
import { testOllamaModelToolSupport } from './tool-support-testing.js';

/** Default timeout for Ollama API requests in milliseconds */
const OLLAMA_API_TIMEOUT_MS = 15000;

/**
 * Ollama model information with tool support status
 */
export interface OllamaModel {
  id: string;
  displayName: string;
  size: number;
  toolSupport?: ToolSupportStatus;
}

/**
 * Result of testing connection to an Ollama server
 */
export interface OllamaConnectionResult {
  success: boolean;
  error?: string;
  models?: OllamaModel[];
}

/** Response type from Ollama /api/tags endpoint */
interface OllamaTagsResponse {
  models?: Array<{ name: string; size: number }>;
}

/**
 * Tests connection to an Ollama server and retrieves available models.
 *
 * This function:
 * 1. Validates and sanitizes the provided URL
 * 2. Calls the Ollama /api/tags endpoint to list available models
 * 3. For each model, tests whether it supports tool calling
 *
 * @param url - The Ollama server URL (e.g., 'http://localhost:11434')
 * @returns Connection result with success status and available models
 */
export async function testOllamaConnection(url: string): Promise<OllamaConnectionResult> {
  const sanitizedUrl = sanitizeString(url, 'ollamaUrl', 256);

  try {
    validateHttpUrl(sanitizedUrl, 'Ollama URL');
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Invalid URL format' };
  }

  try {
    const response = await fetchWithTimeout(
      `${sanitizedUrl}/api/tags`,
      { method: 'GET' },
      OLLAMA_API_TIMEOUT_MS,
    );

    if (!response.ok) {
      throw new Error(`Ollama returned status ${response.status}`);
    }

    const data = (await response.json()) as OllamaTagsResponse;
    const rawModels = data.models || [];

    if (rawModels.length === 0) {
      return { success: true, models: [] };
    }

    const BATCH_SIZE = 5;
    const models: OllamaModel[] = [];

    for (let i = 0; i < rawModels.length; i += BATCH_SIZE) {
      const batch = rawModels.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(
        batch.map(async (m) => {
          const toolSupport = await testOllamaModelToolSupport(sanitizedUrl, m.name);
          return { id: m.name, displayName: m.name, size: m.size, toolSupport };
        }),
      );
      models.push(...results);
    }

    return { success: true, models };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Connection failed';

    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Connection timed out. Make sure Ollama is running.' };
    }
    return { success: false, error: `Cannot connect to Ollama: ${message}` };
  }
}

/** Default timeout for Ollama model create/delete operations (creation can copy weights). */
const OLLAMA_MODEL_OP_TIMEOUT_MS = 120000;

/** Parameters for creating a derived Ollama model from an existing base model. */
export interface OllamaDerivedModelInput {
  /** Name of the new derived model (e.g. 'my-assistant'). */
  name: string;
  /** Existing local base model to derive from (e.g. 'llama3.2'). */
  baseModel: string;
  /** Optional system prompt baked into the derived model. */
  system?: string;
  /** Optional model parameters (temperature, num_ctx, ...) baked into the model. */
  parameters?: Record<string, string | number>;
}

/** Result of a derived-model create/delete operation. */
export interface OllamaModelOpResult {
  success: boolean;
  error?: string;
}

/**
 * Create a derived Ollama model from a local base model, optionally baking in a
 * system prompt and parameters. Uses the Ollama `POST /api/create` endpoint with
 * `stream: false` so the call resolves once the model is fully written.
 *
 * @param url - Ollama server URL (e.g. 'http://localhost:11434')
 * @param input - derived-model definition (name, baseModel, system, parameters)
 */
export async function createOllamaDerivedModel(
  url: string,
  input: OllamaDerivedModelInput,
): Promise<OllamaModelOpResult> {
  const sanitizedUrl = sanitizeString(url, 'ollamaUrl', 256);
  try {
    validateHttpUrl(sanitizedUrl, 'Ollama URL');
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Invalid URL format' };
  }

  const name = sanitizeString(input.name, 'ollamaModelName', 128).trim();
  const baseModel = sanitizeString(input.baseModel, 'ollamaBaseModel', 128).trim();
  if (!name) return { success: false, error: 'A model name is required' };
  if (!baseModel) return { success: false, error: 'A base model is required' };

  // Ollama 0.1.x+ accepts a structured create payload: `from` selects the base
  // model, `system` bakes in a system prompt, `parameters` sets defaults. Older
  // servers also accept `modelfile`; we send both `from` and a `modelfile`
  // fallback so the call works across versions.
  const modelfileLines = [`FROM ${baseModel}`];
  if (input.system) {
    modelfileLines.push(`SYSTEM """${input.system.replace(/"""/g, '"\\""')}"""`);
  }
  if (input.parameters) {
    for (const [key, value] of Object.entries(input.parameters)) {
      modelfileLines.push(`PARAMETER ${key} ${value}`);
    }
  }

  const body: Record<string, unknown> = {
    model: name,
    name,
    from: baseModel,
    modelfile: modelfileLines.join('\n'),
    stream: false,
  };
  if (input.system) body.system = input.system;
  if (input.parameters) body.parameters = input.parameters;

  try {
    const response = await fetchWithTimeout(
      `${sanitizedUrl}/api/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      OLLAMA_MODEL_OP_TIMEOUT_MS,
    );
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return {
        success: false,
        error: `Ollama create failed (status ${response.status})${text ? `: ${text}` : ''}`,
      };
    }
    // With stream:false the body is a single JSON status object; a non-error
    // status (or empty body) means success.
    const text = await response.text().catch(() => '');
    if (text) {
      try {
        const parsed = JSON.parse(text) as { error?: string };
        if (parsed.error) return { success: false, error: parsed.error };
      } catch {
        // streamed/non-JSON body — treat HTTP 200 as success
      }
    }
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Ollama create timed out.' };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create model',
    };
  }
}

/**
 * Delete a (derived) Ollama model via the `DELETE /api/delete` endpoint.
 *
 * @param url - Ollama server URL
 * @param name - name of the model to delete
 */
export async function deleteOllamaDerivedModel(
  url: string,
  name: string,
): Promise<OllamaModelOpResult> {
  const sanitizedUrl = sanitizeString(url, 'ollamaUrl', 256);
  try {
    validateHttpUrl(sanitizedUrl, 'Ollama URL');
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Invalid URL format' };
  }
  const modelName = sanitizeString(name, 'ollamaModelName', 128).trim();
  if (!modelName) return { success: false, error: 'A model name is required' };

  try {
    const response = await fetchWithTimeout(
      `${sanitizedUrl}/api/delete`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelName, name: modelName }),
      },
      OLLAMA_API_TIMEOUT_MS,
    );
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return {
        success: false,
        error: `Ollama delete failed (status ${response.status})${text ? `: ${text}` : ''}`,
      };
    }
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Ollama delete timed out.' };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete model',
    };
  }
}
