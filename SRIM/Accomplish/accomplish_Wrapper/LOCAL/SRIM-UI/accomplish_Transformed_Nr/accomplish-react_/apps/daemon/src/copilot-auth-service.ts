/**
 * CopilotAuthService — daemon port of the Electron
 * `apps/desktop/src/main/opencode/copilot-auth.ts` GitHub Copilot device-OAuth
 * handler.
 *
 * Device-code grant runs entirely in Node (no PTY, no Electron):
 *   1. POST /login/device/code  → device_code + user_code (returned to caller)
 *   2. The *web client* opens the verification URL (browser `window.open`),
 *      since the daemon has no `shell.openExternal`. We still return the URL.
 *   3. Poll /login/oauth/access_token in the background until authorized.
 *   4. Persist tokens via setCopilotOAuthTokens (writes auth.json), same as
 *      desktop. The renderer polls getCopilotOAuthStatus to detect success.
 *
 * The device-flow primitives + auth.json read/write helpers are reused from
 * `@accomplish_ai/agent-core/desktop-main` (pure Node, no Electron deps), so
 * this is a faithful port — no logic is re-implemented or faked.
 */

import { log } from './logger.js';

export interface CopilotLoginResult {
  ok: boolean;
  userCode?: string;
  verificationUri?: string;
  expiresIn?: number;
}

export interface CopilotOAuthStatus {
  connected: boolean;
  username?: string;
  expiresAt?: number;
}

export class CopilotAuthService {
  private activeLoginAbort: AbortController | null = null;

  /**
   * Start the device OAuth flow. Returns immediately with the user code; token
   * polling continues in the background and persists tokens on success.
   */
  async login(): Promise<CopilotLoginResult> {
    if (this.activeLoginAbort) {
      this.activeLoginAbort.abort();
      this.activeLoginAbort = null;
    }
    const abortController = new AbortController();
    this.activeLoginAbort = abortController;

    const { requestCopilotDeviceCode, pollCopilotDeviceToken, setCopilotOAuthTokens } =
      await import('@accomplish_ai/agent-core/desktop-main');

    log.info('[CopilotAuth] Starting device code flow');
    const deviceCode = await requestCopilotDeviceCode();
    log.info('[CopilotAuth] Device code received');

    // Background polling (fire-and-forget) — identical to the desktop handler.
    void (async () => {
      try {
        const tokenResponse = await pollCopilotDeviceToken({
          deviceCode: deviceCode.device_code,
          interval: deviceCode.interval,
          expiresIn: deviceCode.expires_in,
          onPoll: () => {
            if (abortController.signal.aborted) {
              throw new Error('Login cancelled');
            }
            log.info('[CopilotAuth] Polling for token...');
          },
        });

        if (!tokenResponse.access_token) {
          throw new Error('No access token received from GitHub');
        }

        setCopilotOAuthTokens({
          accessToken: tokenResponse.access_token,
          expiresAt: Date.now() + 8 * 60 * 60 * 1000, // GitHub tokens ~8h
        });
        log.info('[CopilotAuth] Login successful, tokens saved');
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        log.warn(`[CopilotAuth] Background poll failed: ${msg}`);
        try {
          const { clearCopilotOAuth } = await import('@accomplish_ai/agent-core/desktop-main');
          clearCopilotOAuth();
        } catch {
          /* best-effort */
        }
      } finally {
        if (this.activeLoginAbort === abortController) {
          this.activeLoginAbort = null;
        }
      }
    })();

    return {
      ok: true,
      userCode: deviceCode.user_code,
      verificationUri: deviceCode.verification_uri,
      expiresIn: deviceCode.expires_in,
    };
  }

  async getStatus(): Promise<CopilotOAuthStatus> {
    const { getCopilotOAuthStatus } = await import('@accomplish_ai/agent-core/desktop-main');
    return getCopilotOAuthStatus();
  }

  async logout(): Promise<void> {
    if (this.activeLoginAbort) {
      this.activeLoginAbort.abort();
      this.activeLoginAbort = null;
    }
    const { clearCopilotOAuth } = await import('@accomplish_ai/agent-core/desktop-main');
    clearCopilotOAuth();
  }
}
