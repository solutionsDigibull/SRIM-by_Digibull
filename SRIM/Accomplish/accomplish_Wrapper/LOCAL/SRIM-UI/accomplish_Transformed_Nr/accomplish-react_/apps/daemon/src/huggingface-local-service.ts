/**
 * HuggingFaceLocalService — daemon port of the Electron
 * `apps/desktop/src/main/providers/huggingface-local/**` provider.
 *
 * Runs ONNX HuggingFace models locally via `@huggingface/transformers`
 * (dynamic ESM import, pure Node — no Electron). Consolidates the desktop
 * provider's split modules (model-manager, model-downloader, model-loader,
 * server-lifecycle, http-handler, chat-completions, request-helpers) into a
 * single daemon-owned service.
 *
 * Differences from the Electron version (all behaviour-preserving):
 *   - `app.getPath('userData')` → daemon `userDataPath` (the --data-dir value).
 *   - `getLogCollector().logEnv(...)` → daemon `log`.
 *   - `getDaemonClient().call('settings.*' | 'provider.*')` → the daemon's own
 *     SettingsService (passed in), since the daemon IS the settings owner.
 *   - Download progress, instead of Electron IPC events, is surfaced through an
 *     injected `emit(channel, data)` callback wired to the BrowserApiServer SSE
 *     `send()` (channel `huggingface-local:download-progress`).
 *
 * NOTE: `@huggingface/transformers` is an optional, heavy native-ish dependency.
 * It is only declared in `apps/desktop`. When it is not resolvable from the
 * daemon's module graph the import throws and the relevant calls return a
 * structured `{ success: false, error }` — they never crash the daemon and never
 * fake a successful result.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { log } from './logger.js';
import type { SettingsService } from './settings-service.js';

/* ────────────────────────────── types ────────────────────────────── */

export interface HuggingFaceLocalModelInfo {
  id: string;
  displayName: string;
  sizeBytes?: number;
  downloaded: boolean;
}

export interface DownloadProgress {
  modelId: string;
  status: 'downloading' | 'complete' | 'error';
  progress: number; // 0-100
  downloadedBytes?: number;
  totalBytes?: number;
  error?: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model?: string;
  messages: ChatMessage[];
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
}

type EmitFn = (channel: string, data: unknown) => void;

/** SSE channel for streamed download progress (mirrors WhatsApp QR events). */
export const HF_DOWNLOAD_PROGRESS_CHANNEL = 'huggingface-local:download-progress';

/**
 * Suggested ONNX-compatible models for quick setup (ported verbatim from the
 * desktop provider's SUGGESTED_MODELS).
 */
const SUGGESTED_MODELS: HuggingFaceLocalModelInfo[] = [
  {
    id: 'onnx-community/Llama-3.2-1B-Instruct-ONNX',
    displayName: 'Llama 3.2 1B Instruct (ONNX)',
    downloaded: false,
  },
  {
    id: 'onnx-community/Phi-3.5-mini-instruct-onnx',
    displayName: 'Phi-3.5 Mini Instruct (ONNX)',
    downloaded: false,
  },
  {
    id: 'onnx-community/Qwen2.5-0.5B-Instruct',
    displayName: 'Qwen2.5 0.5B Instruct (ONNX)',
    downloaded: false,
  },
  {
    id: 'Xenova/distilgpt2',
    displayName: 'DistilGPT-2 (Tiny, for testing)',
    downloaded: false,
  },
];

export class HuggingFaceLocalService {
  private readonly cacheDir: string;
  private emit: EmitFn = () => {};

  // ── inference-server state (was server-state.ts) ──
  private server: http.Server | null = null;
  private port: number | null = null;
  private loadedModelId: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tokenizer: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private model: any = null;
  private isLoading = false;
  private isStopping = false;
  private loadModelPromise: Promise<void> | null = null;
  private startServerPromise: Promise<{ success: boolean; port?: number; error?: string }> | null =
    null;
  private activeGenerations = 0;
  private readonly activeDownloads = new Map<string, AbortController>();

  constructor(
    private readonly userDataPath: string,
    private readonly settingsService: SettingsService,
  ) {
    this.cacheDir = path.join(userDataPath, 'hf-models');
  }

  /** Wire the SSE emit callback (called by BrowserApiServer at construction). */
  setEmit(emit: EmitFn): void {
    this.emit = emit;
  }

  /* ───────────────────────── model management ───────────────────────── */

  private ensureCacheDir(): string {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
    return this.cacheDir;
  }

  /** List cached + suggested models, marking which suggested ones are downloaded. */
  listModels(): {
    cached: HuggingFaceLocalModelInfo[];
    suggested: HuggingFaceLocalModelInfo[];
  } {
    const cached = this.listCachedModels();
    const cachedIds = new Set(cached.map((m) => m.id));
    const suggested = SUGGESTED_MODELS.map((m) => ({
      ...m,
      downloaded: cachedIds.has(m.id),
    }));
    return { cached, suggested };
  }

  private listCachedModels(): HuggingFaceLocalModelInfo[] {
    const cacheDir = this.cacheDir;
    if (!fs.existsSync(cacheDir)) return [];

    const models: HuggingFaceLocalModelInfo[] = [];
    try {
      const entries = fs.readdirSync(cacheDir, { withFileTypes: true });
      for (const orgEntry of entries) {
        if (!orgEntry.isDirectory()) continue;
        const orgDir = path.join(cacheDir, orgEntry.name);
        const modelEntries = fs.readdirSync(orgDir, { withFileTypes: true });
        for (const modelEntry of modelEntries) {
          if (!modelEntry.isDirectory()) continue;
          const modelDir = path.join(orgDir, modelEntry.name);
          models.push({
            id: `${orgEntry.name}/${modelEntry.name}`,
            displayName: modelEntry.name,
            sizeBytes: getDirSize(modelDir),
            downloaded: true,
          });
        }
      }
    } catch (error) {
      log.warn(`[HF Local] Error listing cached models: ${String(error)}`);
    }
    return models;
  }

  /** Delete a cached model (with path-traversal guards). */
  deleteModel(modelId: string): { success: boolean; error?: string } {
    const cacheDir = this.ensureCacheDir();
    const resolvedCache = path.resolve(cacheDir);

    const normalizedId = path.normalize(modelId);
    if (
      !normalizedId ||
      normalizedId.includes('\0') ||
      path.isAbsolute(normalizedId) ||
      normalizedId.split(path.sep).includes('..')
    ) {
      return { success: false, error: 'Invalid model ID' };
    }

    const modelDir = path.resolve(resolvedCache, normalizedId);
    const rel = path.relative(resolvedCache, modelDir);
    if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) {
      return { success: false, error: 'Invalid model ID' };
    }

    if (!fs.existsSync(modelDir)) {
      return { success: false, error: 'Model not found in cache' };
    }

    try {
      fs.rmSync(modelDir, { recursive: true, force: true });
      const orgDir = path.dirname(modelDir);
      if (fs.readdirSync(orgDir).length === 0) {
        fs.rmdirSync(orgDir);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Download a model from HuggingFace Hub via Transformers.js auto-download.
   * Streams progress over the SSE emit callback.
   */
  async downloadModel(modelId: string): Promise<{ success: boolean; error?: string }> {
    const cacheDir = this.ensureCacheDir();
    const abortController = new AbortController();
    this.activeDownloads.set(modelId, abortController);

    const onProgress = (p: DownloadProgress) => this.emit(HF_DOWNLOAD_PROGRESS_CHANNEL, p);

    try {
      onProgress({ modelId, status: 'downloading', progress: 0 });

      const { env, AutoTokenizer, AutoModelForCausalLM } = await loadTransformers();
      env.cacheDir = cacheDir;
      env.allowRemoteModels = true;

      onProgress({ modelId, status: 'downloading', progress: 10 });
      await AutoTokenizer.from_pretrained(modelId);

      onProgress({ modelId, status: 'downloading', progress: 30 });
      try {
        await AutoModelForCausalLM.from_pretrained(modelId, { dtype: 'q4' });
      } catch (err) {
        log.warn(`[HF Local] q4 download failed, trying fp32: ${String(err)}`);
        onProgress({ modelId, status: 'downloading', progress: 50 });
        await AutoModelForCausalLM.from_pretrained(modelId, { dtype: 'fp32' });
      }

      onProgress({ modelId, status: 'complete', progress: 100 });
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown download error';
      onProgress({ modelId, status: 'error', progress: 0, error: message });
      return { success: false, error: message };
    } finally {
      this.activeDownloads.delete(modelId);
    }
  }

  cancelDownload(modelId: string): void {
    const ctrl = this.activeDownloads.get(modelId);
    if (ctrl) {
      ctrl.abort();
      this.activeDownloads.delete(modelId);
    }
  }

  /* ───────────────────────── server lifecycle ───────────────────────── */

  async startServer(modelId: string): Promise<{ success: boolean; port?: number; error?: string }> {
    if (this.startServerPromise) {
      await this.startServerPromise;
      if (this.loadedModelId === modelId && this.port !== null) {
        return { success: true, port: this.port };
      }
      return this.startServer(modelId);
    }
    const promise = this._startServerImpl(modelId).finally(() => {
      this.startServerPromise = null;
    });
    this.startServerPromise = promise;
    return promise;
  }

  private async _startServerImpl(
    modelId: string,
  ): Promise<{ success: boolean; port?: number; error?: string }> {
    if (this.server) {
      try {
        await this.loadModel(modelId);
        return { success: true, port: this.port! };
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return { success: false, error: 'Server stopped during model load' };
        }
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to load model',
        };
      }
    }

    try {
      await this.loadModel(modelId);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return { success: false, error: 'Server stopped during model load' };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load model',
      };
    }

    return new Promise((resolve) => {
      const server = http.createServer(this.createRequestHandler());
      server.listen(0, '127.0.0.1', () => {
        const address = server.address();
        if (address && typeof address !== 'string') {
          this.server = server;
          this.port = address.port;
          log.info(`[HF Server] Listening on http://127.0.0.1:${address.port}`);
          // Persist the chosen port into the HF config so clients can reconnect.
          try {
            const existing = this.settingsService.getHuggingFaceLocalConfig();
            if (existing) {
              this.settingsService.setHuggingFaceLocalConfig({
                ...existing,
                serverPort: address.port,
              });
            }
          } catch (err) {
            log.warn(`[HF Server] Failed to persist port to config: ${String(err)}`);
          }
          resolve({ success: true, port: address.port });
        } else {
          resolve({ success: false, error: 'Failed to get server address' });
        }
      });
      server.on('error', (error) => {
        log.error(`[HF Server] Server error: ${String(error)}`);
        resolve({ success: false, error: error.message });
      });
    });
  }

  async stopServer(): Promise<{ success: boolean; error?: string }> {
    this.isStopping = true;
    const pendingLoad = this.loadModelPromise;

    if (this.server) {
      await new Promise<void>((resolve) => {
        const srv = this.server!;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ('closeAllConnections' in srv && typeof (srv as any).closeAllConnections === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (srv as any).closeAllConnections();
        }
        srv.close(() => {
          log.info('[HF Server] Server stopped');
          resolve();
        });
      });
    }

    const drainStart = Date.now();
    while (this.activeGenerations > 0 && Date.now() - drainStart < 10000) {
      await new Promise((r) => setTimeout(r, 100));
    }

    if (this.model) {
      try {
        await this.model.dispose?.();
      } catch {
        /* ignore dispose errors */
      }
    }

    this.server = null;
    this.port = null;
    this.loadedModelId = null;
    this.tokenizer = null;
    this.model = null;
    this.isLoading = false;
    if (pendingLoad) {
      await pendingLoad.catch(() => {
        /* ignore aborted-load errors */
      });
    }
    this.isStopping = false;
    return { success: true };
  }

  getServerStatus(): {
    running: boolean;
    port: number | null;
    loadedModel: string | null;
    isLoading: boolean;
  } {
    return {
      running: this.server !== null,
      port: this.port,
      loadedModel: this.loadedModelId,
      isLoading: this.isLoading,
    };
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.server || !this.port) {
      return { success: false, error: 'Server is not running' };
    }
    try {
      const response = await fetch(`http://127.0.0.1:${this.port}/health`);
      if (response.ok) return { success: true };
      return { success: false, error: `Health check failed with status ${response.status}` };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }

  /** Stop the server on daemon shutdown. */
  async dispose(): Promise<void> {
    try {
      await this.stopServer();
    } catch {
      /* best-effort */
    }
  }

  /* ───────────────────────── model loader ───────────────────────── */

  private async loadModel(modelId: string): Promise<void> {
    if (!this.isStopping && this.loadedModelId === modelId && this.tokenizer && this.model) {
      log.info(`[HF Server] Model ${modelId} already loaded`);
      return;
    }

    if (this.loadModelPromise) {
      try {
        await this.loadModelPromise;
      } catch {
        /* re-evaluate state below */
      }
      if (!this.isStopping && this.loadedModelId === modelId && this.tokenizer && this.model) {
        return;
      }
    }

    const promise = (async () => {
      this.isLoading = true;
      const stoppedAtStart = this.isStopping;
      log.info(`[HF Server] Loading model: ${modelId}`);

      try {
        const { env, AutoTokenizer, AutoModelForCausalLM } = await loadTransformers();

        env.localModelPath = this.cacheDir;
        env.allowRemoteModels = false;

        const tokenizer = await AutoTokenizer.from_pretrained(modelId);

        // Quantization + device preference come from the daemon's own settings.
        let quantization: string | null = null;
        let devicePreference: string | null = null;
        try {
          const cfg = this.settingsService.getHuggingFaceLocalConfig();
          quantization = cfg?.quantization ?? null;
          devicePreference = cfg?.devicePreference ?? null;
        } catch {
          /* defaults below */
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const envAny = env as any;
        envAny.backends ??= {};
        envAny.backends.onnx ??= {};
        if (devicePreference && devicePreference !== 'auto') {
          envAny.backends.onnx.device = devicePreference;
        } else {
          delete envAny.backends.onnx.device;
        }

        const dtypesToTry: string[] = quantization ? [quantization] : ['q4'];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let model: any;
        for (const dtype of dtypesToTry) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            model = await AutoModelForCausalLM.from_pretrained(modelId, { dtype: dtype as any });
            break;
          } catch (err) {
            if (dtype === dtypesToTry[dtypesToTry.length - 1] && dtype !== 'fp32') {
              log.warn(`[HF Server] Failed to load ${dtype} model, trying fp32: ${String(err)}`);
              model = await AutoModelForCausalLM.from_pretrained(modelId, { dtype: 'fp32' });
            } else {
              throw err;
            }
          }
        }

        if (this.isStopping || stoppedAtStart) {
          log.info(`[HF Server] Stop requested during load of ${modelId}; discarding.`);
          try {
            await model?.dispose?.();
          } catch {
            /* ignore */
          }
          throw new DOMException('Load cancelled by stopServer()', 'AbortError');
        }

        if (this.model) {
          const start = Date.now();
          while (this.activeGenerations > 0 && Date.now() - start < 10000) {
            await new Promise((r) => setTimeout(r, 100));
          }
          try {
            await this.model.dispose?.();
          } catch {
            /* ignore */
          }
        }

        this.tokenizer = tokenizer;
        this.model = model;
        this.loadedModelId = modelId;
        log.info(`[HF Server] Model loaded: ${modelId}`);
      } catch (error) {
        const isAbort = error instanceof DOMException && error.name === 'AbortError';
        if (isAbort) {
          log.info(`[HF Server] Load cancelled: ${modelId}`);
        } else {
          log.error(`[HF Server] Failed to load model ${modelId}: ${String(error)}`);
        }
        throw error;
      } finally {
        this.isLoading = false;
        this.loadModelPromise = null;
      }
    })();

    this.loadModelPromise = promise;
    return promise;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatChatPrompt(messages: ChatMessage[], tokenizer: any): string {
    try {
      if (tokenizer.apply_chat_template) {
        return tokenizer.apply_chat_template(messages, {
          tokenize: false,
          add_generation_prompt: true,
        });
      }
    } catch {
      /* fall through to manual formatting */
    }
    return (
      messages
        .map((m) => {
          if (m.role === 'system') return `System: ${m.content}`;
          if (m.role === 'user') return `User: ${m.content}`;
          return `Assistant: ${m.content}`;
        })
        .join('\n') + '\nAssistant:'
    );
  }

  /* ───────────────────────── HTTP handler ───────────────────────── */

  private createRequestHandler(): (
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ) => Promise<void> {
    return async (req, res) => {
      setCorsHeaders(req, res);

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = req.url || '';
      try {
        if (req.method === 'GET' && url === '/v1/models') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              object: 'list',
              data: this.loadedModelId
                ? [
                    {
                      id: this.loadedModelId,
                      object: 'model',
                      created: Math.floor(Date.now() / 1000),
                      owned_by: 'huggingface-local',
                    },
                  ]
                : [],
            }),
          );
          return;
        }

        if (req.method === 'POST' && url === '/v1/chat/completions') {
          if (this.isLoading) {
            writeJsonError(res, 503, 'Model is loading, please wait', 'server_error');
            return;
          }
          if (!this.model || !this.tokenizer) {
            writeJsonError(res, 503, 'No model loaded', 'server_error');
            return;
          }

          const body = await readBody(req);
          let chatReq: ChatCompletionRequest;
          try {
            chatReq = JSON.parse(body);
          } catch {
            writeJsonError(res, 400, 'Invalid JSON in request body');
            return;
          }

          if (!Array.isArray(chatReq.messages) || chatReq.messages.length === 0) {
            writeJsonError(res, 400, 'messages must be a non-empty array');
            return;
          }
          for (const message of chatReq.messages) {
            if (
              !message ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (message as any).role === undefined ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (message as any).content === undefined ||
              typeof message.content !== 'string' ||
              !['system', 'user', 'assistant'].includes(message.role)
            ) {
              writeJsonError(res, 400, 'Invalid message format');
              return;
            }
          }

          if (chatReq.stream) {
            await this.handleStreamingCompletion(chatReq, res);
          } else {
            await this.handleChatCompletion(chatReq, res);
          }
          return;
        }

        if (req.method === 'GET' && (url === '/health' || url === '/')) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              status: 'ok',
              model: this.loadedModelId,
              isLoading: this.isLoading,
            }),
          );
          return;
        }

        writeJsonError(res, 404, 'Not found', 'invalid_request');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        log.error(`[HF Server] Request error: ${String(error)}`);
        if (error?.message === 'PayloadTooLarge') {
          if (!res.headersSent) writeJsonError(res, 413, 'Request entity too large');
          return;
        }
        if (!res.writableEnded) {
          if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              error: {
                message: error instanceof Error ? error.message : 'Internal server error',
                type: 'server_error',
              },
            }),
          );
        }
      }
    };
  }

  /* ───────────────────────── chat completions ───────────────────────── */

  private async handleChatCompletion(
    req: ChatCompletionRequest,
    res: http.ServerResponse,
  ): Promise<void> {
    if (!this.tokenizer || !this.model) {
      writeJsonError(res, 503, 'No model loaded', 'server_error');
      return;
    }
    if (!validateSamplingParams(req, res)) return;

    const maxNewTokens = req.max_tokens ?? 512;
    const temperature = req.temperature ?? 0.7;
    const topP = req.top_p ?? 0.9;

    const prompt = this.formatChatPrompt(req.messages, this.tokenizer);
    const inputs = this.tokenizer(prompt, { return_tensor: true });

    this.activeGenerations++;
    try {
      const outputs = await this.model.generate({
        ...inputs,
        max_new_tokens: maxNewTokens,
        temperature,
        top_p: topP,
        do_sample: temperature > 0,
      });

      const promptLength = inputs.input_ids.dims?.[1] || 0;
      const generatedTokens = outputs.slice(null, promptLength);
      const text = this.tokenizer.decode(generatedTokens[0], { skip_special_tokens: true });

      const completionTokens = generatedTokens.dims?.[1] || 0;
      const totalTokens = promptLength + completionTokens;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          id: `chatcmpl-hf-${Date.now()}`,
          object: 'chat.completion',
          created: Math.floor(Date.now() / 1000),
          model: this.loadedModelId,
          choices: [
            {
              index: 0,
              message: { role: 'assistant', content: text.trim() },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: promptLength,
            completion_tokens: completionTokens,
            total_tokens: totalTokens,
          },
        }),
      );
    } finally {
      this.activeGenerations--;
    }
  }

  private async handleStreamingCompletion(
    req: ChatCompletionRequest,
    res: http.ServerResponse,
  ): Promise<void> {
    if (!this.tokenizer || !this.model) {
      writeJsonError(res, 503, 'No model loaded', 'server_error');
      return;
    }
    if (!validateSamplingParams(req, res)) return;

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const prompt = this.formatChatPrompt(req.messages, this.tokenizer);
    const inputs = this.tokenizer(prompt, { return_tensor: true });
    const maxNewTokens = req.max_tokens ?? 512;
    const temperature = req.temperature ?? 0.7;
    const topP = req.top_p ?? 0.9;
    const completionId = `chatcmpl-hf-${Date.now()}`;

    this.activeGenerations++;
    try {
      await this.model.generate({
        ...inputs,
        max_new_tokens: maxNewTokens,
        temperature,
        top_p: topP,
        do_sample: temperature > 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback_function: (output: any) => {
          const lastToken = output.slice(null, -1);
          const tokenizer = this.tokenizer;
          if (!tokenizer) return;
          const tokenText = tokenizer.decode(lastToken[0], { skip_special_tokens: true });
          if (tokenText) {
            res.write(
              `data: ${JSON.stringify({
                id: completionId,
                object: 'chat.completion.chunk',
                created: Math.floor(Date.now() / 1000),
                model: this.loadedModelId,
                choices: [{ index: 0, delta: { content: tokenText }, finish_reason: null }],
              })}\n\n`,
            );
          }
        },
      });

      res.write(
        `data: ${JSON.stringify({
          id: completionId,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: this.loadedModelId,
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        })}\n\n`,
      );
      res.write('data: [DONE]\n\n');
    } catch (error) {
      res.write(
        `data: ${JSON.stringify({
          error: {
            message: error instanceof Error ? error.message : 'Generation failed',
            type: 'server_error',
          },
        })}\n\n`,
      );
      log.error(`[HF Server] Streaming generation error: ${String(error)}`);
    } finally {
      this.activeGenerations--;
      if (!res.writableEnded) res.end();
    }
  }
}

/* ────────────────────────── module helpers ────────────────────────── */

/**
 * Dynamically import `@huggingface/transformers` (ESM-only, optional heavy dep).
 * Surfaces a clear error if the package is not installed in the daemon graph.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadTransformers(): Promise<any> {
  try {
    // @ts-ignore — optional heavy dependency; resolved at runtime only if installed.
    return await import('@huggingface/transformers');
  } catch (err) {
    throw new Error(
      '@huggingface/transformers is not available in the daemon. Install it in apps/daemon ' +
        'to enable local HuggingFace inference. Original error: ' +
        (err instanceof Error ? err.message : String(err)),
    );
  }
}

function getDirSize(dirPath: string): number {
  let total = 0;
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dirPath, entry.name);
      if (entry.isFile()) total += fs.statSync(full).size;
      else if (entry.isDirectory()) total += getDirSize(full);
    }
  } catch {
    /* ignore permission errors */
  }
  return total;
}

function readBody(req: http.IncomingMessage, limitBytes = 10 * 1024 * 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    let overLimit = false;
    req.on('data', (chunk: Buffer) => {
      if (overLimit) return;
      size += chunk.length;
      if (size > limitBytes) {
        overLimit = true;
        reject(new Error('PayloadTooLarge'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!overLimit) resolve(Buffer.concat(chunks).toString('utf-8'));
    });
    req.on('error', reject);
  });
}

function writeJsonError(
  res: http.ServerResponse,
  status: number,
  message: string,
  type = 'invalid_request_error',
): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: { message, type } }));
}

function validateSamplingParams(req: ChatCompletionRequest, res: http.ServerResponse): boolean {
  const maxTokens = req.max_tokens ?? 512;
  const temperature = req.temperature ?? 0.7;
  const topP = req.top_p ?? 0.9;
  if (!Number.isFinite(maxTokens) || maxTokens < 1 || maxTokens > 32768) {
    writeJsonError(res, 400, 'max_tokens must be between 1 and 32768');
    return false;
  }
  if (!Number.isFinite(temperature) || temperature < 0 || temperature > 2) {
    writeJsonError(res, 400, 'temperature must be between 0 and 2');
    return false;
  }
  if (!Number.isFinite(topP) || topP <= 0 || topP > 1) {
    writeJsonError(res, 400, 'top_p must be between 0 and 1');
    return false;
  }
  return true;
}

function setCorsHeaders(req: http.IncomingMessage, res: http.ServerResponse): void {
  const origin = req.headers.origin;
  if (origin && /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
