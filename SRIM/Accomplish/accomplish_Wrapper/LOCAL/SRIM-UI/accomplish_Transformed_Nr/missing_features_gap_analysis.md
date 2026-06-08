# Feature Parity Gap Analysis — Electron → Web (browser) build

Audit of `window.accomplish` surface: the canonical interface (`apps/web/src/client/lib/accomplish.ts`)
vs. what the web build actually wires (`apps/web/src/client/lib/accomplish-backend.ts`) and what the
daemon dispatch handles (`apps/daemon/src/browser-api-server.ts` `dispatch()`).

All claims below are derived from reading the actual files (interface, backend Proxy, daemon dispatch,
daemon services, daemon-routes.ts, and Electron-main handlers). Sources cited per row.

---

## Headline numbers

| Metric | Count |
|---|---|
| Total distinct UI capabilities on `window.accomplish` (incl. `gws.*` + `analytics.*`) | **148** |
| Methods explicitly wired in the browser path (RPC table + EV table + inline browser handlers/stubs) | **~96** |
| Methods MISSING (no real backend in the browser path; default to `noopAsync`/`noop`) | **~52** |

Notes on counting:
- "Wired" includes (a) the `RPC` map (≈80 channels), (b) the `EV` event map (10 events), (c) inline
  browser-native handlers (`openExternal`, `pickFiles`, `pickFolder`, `getVersion`, `getPlatform`, the
  three `test*Connection` fetches), and (d) explicit safe-stubs in `accomplish-backend.ts`
  (`speech*`, `daemon*`, `startBrowserPreview`, `gws`, etc.). Stubs are "wired" in the sense that they
  do not 500, but several stubs silently return falsy values and are functionally MISSING — those are
  listed in the buckets below where a real backend exists or is portable.
- The bedrock/vertex/HF "overrides" in `accomplish.ts` only JSON-serialize args; they still depend on a
  wired RPC channel underneath. Bedrock channels ARE wired; Vertex/HF model channels are NOT.
- `analytics.*` (≈40 sub-methods) is counted as ONE capability (the whole namespace is a no-op Proxy).

### Per-bucket counts

| Bucket | Meaning | Count |
|---|---|---|
| **A — TRIVIAL-WIRE** | Daemon service / agent-core fn already implements it; just add RPC entry + dispatch case | **24** |
| **B — NEEDS-DAEMON-PORT** | Logic lives in Electron main; no daemon equivalent yet | **15** |
| **C — BROWSER-NATIVE-REPLACEMENT** | Electron/OS API with a web equivalent | **6** |
| **D — NOT-POSSIBLE-IN-BROWSER** | Native shell / OS integration with no web equivalent | **7** |

---

## Bucket A — TRIVIAL-WIRE (24) — ✅ WIRED (2026-06-03)

> **STATUS: DONE (pending full typecheck).** All bucket-A methods are now wired:
> client RPC-table entries added in `apps/web/src/client/lib/accomplish-backend.ts`
> and matching `dispatch()` cases in `apps/daemon/src/browser-api-server.ts`
> (settings config get/set, model fetchers, validators, secrets helpers, and the
> `getTodosForTask`→`task:get-todos` alias). Verified at the syntax/transpile level.
> **Must still be confirmed with a real `pnpm typecheck` once deps are installed
> under Node 24** — the arg-forwarding (`fn(...(args as Parameters<typeof fn>))`)
> and setter casts compile syntactically but only a full type-check proves the
> signatures line up with what the UI sends.


A daemon service or an exported `agent-core` function already implements the logic. Pattern to follow is
the existing `bedrock:fetch-models` / `ollama:test-connection` cases in `dispatch()` (dynamic
`import('@accomplish_ai/agent-core')`), or a one-line delegate to an existing service method.

| Method | Backing daemon service / agent-core fn | Effort note |
|---|---|---|
| `getNotificationsEnabled` | `settingsService.getNotificationsEnabled()` (settings-service.ts:129) | wired in EV? No — add RPC case. 1 line |
| `getOpenAiBaseUrl` | `settingsService.getOpenAiBaseUrl()` (settings-service.ts:223) | 1-line dispatch case |
| `setOpenAiBaseUrl` | `settingsService.setOpenAiBaseUrl()` (settings-service.ts:227) | 1-line dispatch case |
| `getCloudBrowserConfig` | `settingsService.getCloudBrowserConfig()` (settings-service.ts:141) | 1-line dispatch case |
| `setCloudBrowserConfig` | `settingsService.setCloudBrowserConfig()` (settings-service.ts:106) | 1-line dispatch case |
| `getAzureFoundryConfig` | `settingsService.getAzureFoundryConfig()` (settings-service.ts:250) | 1-line dispatch case |
| `setAzureFoundryConfig` / `saveAzureFoundryConfig` | `settingsService.setAzureFoundryConfig()` (settings-service.ts:254) | 1-line dispatch case |
| `getLMStudioConfig` | `settingsService.getLMStudioConfig()` (settings-service.ts:259) | 1-line dispatch case |
| `setLMStudioConfig` | `settingsService.setLMStudioConfig()` (settings-service.ts:263) | 1-line dispatch case |
| `getHuggingFaceLocalConfig` | `settingsService.getHuggingFaceLocalConfig()` (settings-service.ts:197) | config only (not model mgmt). 1-line case |
| `setHuggingFaceLocalConfig` | `settingsService.setHuggingFaceLocalConfig()` (settings-service.ts:201) | 1-line dispatch case |
| `fetchProviderModels` | agent-core `fetchProviderModels` (providers/fetch-models.ts:157, exported index.ts:256) | dynamic import + case (mirror bedrock:fetch-models) |
| `fetchOpenRouterModels` | agent-core `fetchOpenRouterModels` (openrouter.ts:28, index.ts:240) | dynamic import + case |
| `fetchLiteLLMModels` | agent-core `fetchLiteLLMModels` (litellm.ts:103) | dynamic import + case |
| `fetchLMStudioModels` | agent-core `fetchLMStudioModels` (lmstudio-models.ts:103) | dynamic import + case |
| `fetchNimModels` | agent-core `fetchNimModels` (nim.ts:146, index.ts:244) | dynamic import + case |
| `testNimConnection` | agent-core `testNimConnection` (nim.ts:103, index.ts:244) | dynamic import + case |
| `testCustomConnection` | agent-core `testCustomConnection` (custom.ts:26, index.ts:259) | dynamic import + case |
| `validateApiKey` | agent-core `validateApiKey` (validation.ts:19, index.ts:233) | dynamic import + case |
| `validateVertexCredentials` | agent-core `validateVertexCredentials` (vertex.ts, index.ts:237) | dynamic import + case |
| `fetchVertexModels` | agent-core `fetchVertexModels` (vertex.ts:152, index.ts:237) | dynamic import + case |
| `getTodosForTask` | `storage.getTodosForTask()` (used in dispatch as `task:get-todos`) | UI name differs from wired `getTaskTodos`; add alias mapping |
| `hasApiKey` / `hasAnyApiKey` / `getAllApiKeys` | `secretsService.hasAnyApiKey()` / `getAllApiKeys()` (secrets-service.ts:35,39) | 1-line dispatch cases |
| `getAccomplishAiStatus` extras: `accomplishAiGetStatus` is wired; `getBuildCapabilities` stubbed | settings/secrets present | minor |

> Spot-check validation done for bucket A (>15 methods): settings-service.ts confirmed getters/setters
> for OpenAiBaseUrl, CloudBrowser, AzureFoundry, LMStudio, NIM, HuggingFaceLocal config and
> getNotificationsEnabled; secrets-service.ts confirmed getAllApiKeys/hasAnyApiKey/getApiKey;
> agent-core index.ts confirmed exports of fetchProviderModels, fetchOpenRouterModels, fetchNimModels,
> testNimConnection, testCustomConnection, validateApiKey, validateVertexCredentials, fetchVertexModels.
> daemon-routes.ts independently registers RPC handlers for all the settings-service config methods
> (lines 589–661), proving the service methods are real and reachable.

---

## Bucket B — NEEDS-DAEMON-PORT (15)

Logic currently lives only in `apps/desktop/src/main/**`. Portable to the daemon (mostly HTTP/CLI calls,
no Electron-shell requirement) but no daemon dispatch path exists yet.

| Method | Electron source file | Effort note |
|---|---|---|
| `validateApiKeyForProvider` | `ipc/handlers/api-key-handlers/api-key-validation-handlers.ts` | port validation orchestration to daemon (logic mostly in agent-core already) |
| `detectVertexProject` | `main/providers/vertex.ts` | uses gcloud/ADC project discovery — port runtime detection to daemon |
| `listVertexProjects` | `main/providers/vertex.ts` | gcloud Resource Manager call — port to daemon |
| `saveVertexCredentials` | `ipc/handlers/.../*vertex*` + secrets | add `storeVertexCredentials` to secrets-service (mirror bedrock helpers; secrets-service has NO vertex helper today) |
| `getVertexCredentials` | secrets | add `getVertexCredentials` to secrets-service (mirror bedrock) |
| `listHuggingFaceModels` | `main/providers/huggingface-local/model-manager.ts` | port model catalog/cache scan to daemon |
| `downloadHuggingFaceModel` | `main/providers/huggingface-local/model-downloader.ts` | port downloader + progress events to daemon SSE |
| `startHuggingFaceServer` | `main/providers/huggingface-local/server-lifecycle.ts` | port local inference server lifecycle to daemon |
| `stopHuggingFaceServer` | `main/providers/huggingface-local/server-lifecycle.ts` | port to daemon |
| `getHuggingFaceServerStatus` / `testHuggingFaceConnection` / `deleteHuggingFaceModel` | `main/providers/huggingface-local/*` | port to daemon |
| `speechValidate` | `main/services/speechToText.ts` → agent-core SpeechService | HTTP to ElevenLabs; port to daemon (no Electron dep) |
| `speechTranscribe` (real impl) | `main/services/speechToText.ts` | currently stubbed `{success:false}`; port SpeechService call to daemon |
| `loginGithubCopilot` / `getCopilotOAuthStatus` / `logoutGithubCopilot` | `main/opencode/copilot-auth.ts` | device-code OAuth; daemon can drive it (only `openExternal`/copy is shell) |
| `loginOpenAiWithChatGpt` / `getOpenAiOauthStatus` | daemon `opencode/auth-openai.ts` ALREADY exists (auth.openai.startLogin/status in daemon-routes.ts:366) | **near-A**: daemon has the manager; only needs browser dispatch cases + a web way to open the authorize URL |
| `loginSlackMcp` / `getSlackMcpOauthStatus` / `logoutSlackMcp` | `main/opencode/slack-auth/index.ts` | OAuth orchestration portable to daemon; redirect step needs `window.open` |

> Note: `loginOpenAiWithChatGpt` is borderline A — the OAuth manager is already daemon-side
> (`apps/daemon/src/opencode/auth-openai.ts`, registered in daemon-routes.ts). It is in B only because
> the browser-api-server has no dispatch case and the `:1455` redirect assumes a desktop browser open.

---

## Bucket C — BROWSER-NATIVE-REPLACEMENT (6)

| Method | Electron source | Web replacement |
|---|---|---|
| `pickFiles` | `ipc/handlers/file-handlers.ts` | ALREADY done via `<input type=file multiple>` (browserPickFiles) — but loses real FS path |
| `pickFolder` / `pickSkillFolder` | `file-handlers.ts` / `skills-handlers.ts` | done via `webkitdirectory`; path is best-effort |
| `openExternal` | Electron `shell.openExternal` | done via `window.open(url,'_blank')` |
| `exportLogs` | `ipc/handlers/log-handlers.ts` | replace with Blob + `<a download>` in renderer (currently noop) |
| `captureScreenshot` | `ipc/handlers/capture-handlers.ts` (`BrowserWindow.capturePage`) | `html2canvas` of the DOM, or `getDisplayMedia()` screen capture (user-prompted) |
| `captureAxtree` | `capture-handlers.ts` | serialize the live DOM accessibility tree in-renderer |

> Caveat: file/folder pickers in the browser cannot return absolute OS paths the daemon can read
> (sandbox). Attachments may need an upload path rather than a path string. captureScreenshot via
> `getDisplayMedia` requires an explicit user permission prompt and captures the screen, not the app
> page, so it is an imperfect replacement.

---

## Bucket D — NOT-POSSIBLE-IN-BROWSER (7)

| Method | Electron source | Why impossible |
|---|---|---|
| `daemonStart` / `daemonStop` / `daemonRestart` | `main/daemon/daemon-lifecycle.ts` | browser cannot fork/kill the daemon process (stubbed: "managed externally") |
| `getDaemonSocketPath` | `main/daemon-bootstrap.ts` | no OS socket/IPC path concept in browser (stubbed `''`) |
| `respondToClose` / `onCloseRequested` | `main/app-shutdown.ts` / `app-window.ts` | window-close lifecycle is owned by the OS/Electron shell |
| `isAutoStartEnabled` | `main/app-startup.ts` (login-item) | OS auto-start (login items) unavailable in browser (stubbed `false`) |
| `startBrowserPreview` / `stopBrowserPreview` / `getBrowserPreviewStatus` | `main/services/browserPreview.ts` (CDP) | drives a CDP-attached Electron BrowserView; no web equivalent (stubbed) |
| `openSkillInEditor` / `showSkillInFolder` | `ipc/handlers/skills-handlers.ts` (`shell.openPath`) | open native editor / reveal-in-Finder needs OS shell (noop) |
| `gws.*` (Google Workspace OAuth: startAuth/completeAuth/...) | `main/google-accounts/google-auth.ts` | loopback OAuth redirect + token storage assume desktop; daemon `google-account-service.ts` exists for token *refresh/storage*, but the interactive consent redirect needs a native/loopback browser flow (stubbed). Partially portable but currently D. |

> `gws` is the most "portable" of D: the daemon already has `google-account-service.ts` with
> list/add/remove/updateToken/refreshNow. If a web-compatible OAuth redirect (hosted callback) is added,
> gws becomes mostly bucket A/B. Listed as D because today's flow is desktop-loopback only.

---

## Confidence & caveats

- **Counts are approximate (±3).** The UI interface mixes a flat method surface with two nested
  namespaces (`gws`, `analytics`). I counted `analytics` as one capability and `gws` sub-methods
  individually. Different counting of the ~40 `analytics.*` sub-methods would shift "total".
- **"Wired" is generous.** Several entries in `accomplish-backend.ts` are *stubs* that return falsy
  values (`speechTranscribe`→`{success:false}`, `getBuildCapabilities`→no free/analytics,
  `connectors:*-oauth`→empty). They don't error, but the feature is non-functional. I treated those as
  MISSING when a real or portable backend exists (buckets A/B), and as intentional stubs (C/D)
  otherwise.
- **`getTodosForTask` vs `getTaskTodos`:** the RPC map key is `getTaskTodos` but the UI interface method
  is `getTodosForTask`. Unless a component calls the exact UI name, this is a silent miss — flagged in A.
- **Connector OAuth (`startConnectorOAuth`, `loginBuiltInConnector`, Slack):** wired to dispatch but
  dispatch returns hardcoded stubs (`{ ok:false, 'OAuth requires desktop app' }`). The connector-service
  itself (token storage, list, enable) is real; only the interactive OAuth redirect is stubbed. Treated
  as B (Slack/built-in login) where the flow is HTTP-portable.
- **Vertex:** agent-core exports `validateVertexCredentials`/`fetchVertexModels` (A), but
  `detectVertexProject`/`listVertexProjects` rely on gcloud/ADC (Electron main) and credential
  save/get need new secrets-service helpers (B). I did not run gcloud to confirm runtime behavior.
- **Not executed:** this is a static read-only audit. I did not run the web build or hit the daemon, so
  "trivial" effort estimates assume the existing dispatch patterns compile as-is.
</content>
</invoke>
