# Migration Inventory — Electron → Web

**Source:** `E:\Accomplish\accomplish_Wrapper\ELECTRON`
**Target:** `E:\Accomplish\accomplish_Wrapper\LOCAL`
**Generated:** 2026-06-02
**Status:** Discovery (Agent 1 / Cartographer) complete. Feasibility verdict at bottom — read before any code translation.

---

## 0. Executive summary (the one thing to read)

The renderer UI is **already a standalone browser React app**. `apps/web/src/client/**` contains **zero** imports of `electron`, `node:*`, `fs`, or `child_process` (verified). It talks to the backend exclusively through a `window.accomplish.*` preload bridge exposing **462 methods**.

What makes this an *Electron* app is **not the UI** — it is the **backend**: the Electron main process, the preload bridge, and a **forked Node.js daemon** that does work a browser sandbox fundamentally cannot do (spawn child processes, open raw sockets, run native SQLite, drive Docker and a real browser, load local LLMs).

Consequently, **"100% feature parity as a pure in-browser app" is not achievable for this application.** A browser tab cannot spawn the agent CLI processes that are the product's entire reason to exist. The realistic, lossless web target is a **client/server split** (browser UI + a local Node backend), not an in-browser shim layer. Details and the decision you need to make are in §6.

---

## 1. Electron API surface (`electron` imports)

**71 files** import directly from `electron`. All are in `apps/desktop/src/main/**` and `apps/desktop/src/preload/**` — i.e. the desktop shell, never the web UI.

Representative high-impact files:

| File | Electron APIs (role) |
| --- | --- |
| `apps/desktop/src/main/index.ts` | `app`, `BrowserWindow` — app lifecycle, window creation |
| `apps/desktop/src/preload/index.ts` | `contextBridge`, `ipcRenderer` — **the entire 462-method bridge** |
| `apps/desktop/src/main/ipc/handlers/**` (~30 files) | `ipcMain.handle` registrations (tasks, settings, providers, connectors, files, speech, whatsapp, google-accounts, …) |
| `apps/desktop/src/main/app-window.ts` | `BrowserWindow` lifecycle |
| `apps/desktop/src/main/menu.ts`, `tray.ts` | `Menu`, `Tray` — native menus/tray |
| `apps/desktop/src/main/updater/**` (5 files) | `electron-updater`, `dialog` — auto-update |
| `apps/desktop/src/main/protocol-handlers.ts` | custom protocol (`accomplish://`) registration |
| `apps/desktop/src/main/store/storage.ts`, `legacyMigration.ts` | `electron-store`, user-data paths |
| `apps/desktop/src/main/google-accounts/google-auth.ts` | loopback OAuth via Electron |

> Note: `ipcMain.handle/on` appears literally only **5 times** as a raw call — registration is centralized/abstracted through `apps/desktop/src/main/ipc/handlers.ts`, which fans out to the ~30 handler modules above. The real IPC surface is the **462 preload methods**, not 5.

---

## 2. Node-only / native runtime surface

### 2a. `child_process` (spawn / fork / execFile) — **35 files**

This is the **core blocker**. The app spawns external processes as its primary execution model:

- `packages/agent-core/src/opencode/cli-resolver.ts`, `cli-path-utils.ts` — resolves & spawns the **`opencode` agent CLI** (the actual coding-agent runtime)
- `apps/daemon/src/opencode/server-manager.ts` — manages the agent server subprocess
- `packages/agent-core/src/sandbox/docker-provider.ts` — spawns **Docker** containers (sandbox execution)
- `packages/agent-core/src/browser/server.ts`, `browser-session.ts`, `browser-node-env.ts` — spawns/drives a **real browser** (Playwright/CDP)
- `packages/agent-core/src/providers/vertex-auth.ts` — shells out to `gcloud`
- `apps/desktop/src/main/daemon/{daemon-connector,service-manager}.ts` — **forks the daemon process**
- `apps/desktop/src/main/providers/huggingface-local/{model-loader,model-manager}.ts` — local LLM inference

### 2b. Native SQLite — **70 files touch storage/migrations**

- `better-sqlite3` (native `.node` binding) in `packages/agent-core` and `apps/daemon`
- Full migration system: **31 migrations** (`v001`…`v031`) in `packages/agent-core/src/storage/migrations/`
- DB files: `accomplish.db` / `accomplish-dev.db` in Electron user-data dir

### 2c. Other Node/native dependencies (browser-incompatible)

| Dependency | Used for | Browser-possible? |
| --- | --- | --- |
| `@whiskeysockets/baileys` 7.0.0-rc.9 | WhatsApp via **raw socket** | ❌ needs TCP/Node |
| `@playwright/test` / browser server | Browser automation for agents | ❌ needs OS process |
| `better-sqlite3` | Persistent local DB | ⚠️ replaceable with IndexedDB (data migration required) |
| `electron-store` | Settings/secrets on disk | ⚠️ replaceable with IndexedDB/localStorage |
| `electron-updater` | Auto-update | ❌ N/A for web (web has no installer) |
| `@sentry/electron` | Crash reporting | ⚠️ swap for `@sentry/browser` |
| HuggingFace local model loader | On-device LLM inference | ❌ needs filesystem + native runtime |
| Docker sandbox provider | Isolated agent execution | ❌ needs Docker daemon |
| Loopback OAuth (Google) | Auth callback on `localhost:port` | ❌ browser can't open a listener |

### 2d. `localStorage` / `fs` in web code

- `apps/web/src/client/**`: **no** `fs`/`node:` imports (clean). Web persistence already goes through the preload bridge → daemon → SQLite, not direct disk access.

---

## 3. The daemon (`apps/daemon`) — the real backend

Forked Node.js child process (no `electron` imports by design). `apps/daemon/src/index.ts` wires up:

`StorageService`, `TaskService`, `SchedulerService`, `HealthService`, `WhatsAppDaemonService` + `WhatsAppSendApi`, `OpenAiOauthManager`, `SecretsService`, `SettingsService`, `WorkspaceService`, `ConnectorService`, `LegacyImportService`, `GoogleAccountService`, `SkillsService`, plus HTTP listeners for permission/question ports.

Communication today: `DaemonClient` (main) ↔ `DaemonRpcServer` (daemon) over process IPC.

---

## 4. IPC architecture (what must be re-transported)

```
React UI (apps/web/src/client)          ← already browser-native, portable as-is
  ↓ window.accomplish.*  (462 methods)  ← the contract to preserve
Preload bridge (contextBridge)          ← REPLACE: transport only
  ↓ ipcRenderer.invoke / .on
Main process handlers (~30 modules)     ← KEEP logic, REPLACE Electron glue
  ↓ DaemonClient → DaemonRpcServer (IPC)
Daemon (Node services above)            ← KEEP as a server; cannot run in-browser
```

The migration is fundamentally a **transport + host swap**, not a UI rewrite.

---

## 5. Feature → browser-feasibility matrix

| Feature | Today | Pure-browser feasible? |
| --- | --- | --- |
| React UI / routing / state | apps/web | ✅ already portable |
| Settings & preferences | SQLite/electron-store | ✅ via IndexedDB (needs data migration) |
| Task history / metadata | SQLite | ✅ via IndexedDB, **OR** keep server DB |
| **Run a coding agent** (opencode CLI) | child_process | ❌ **impossible in browser** |
| Docker sandbox execution | child_process + Docker | ❌ impossible |
| Browser automation tool | Playwright subprocess | ❌ impossible |
| WhatsApp integration | Baileys raw socket | ❌ impossible (needs Node) |
| Local HuggingFace models | native + fs | ❌ impossible |
| Google/OAuth login | loopback listener | ⚠️ redesign to redirect-based OAuth |
| Auto-update | electron-updater | ➖ N/A (web deploys server-side) |
| Read/write user's project files | fs (real paths) | ⚠️ File System Access API — partial, gated by permission prompts, no arbitrary paths |
| Native menu / tray / window frame | Electron | ➖ N/A in browser |

---

## 6. Verdict & decision required (STOP before translation)

**The directive's stated goal — a pure in-browser app with full feature parity via memfs/Dexie shims — cannot be met for this application.** memfs/Dexie can fake a filesystem and a database, but they cannot spawn the agent processes, Docker, browser, or WhatsApp socket that *are* the product. Shimming those would produce a UI that loads but cannot actually do its job. I will not generate a report claiming otherwise.

There are two **honest** migration targets. They need your decision because they diverge sharply in effort and outcome:

**Option A — Web client + local Node backend (lossless, recommended).**
Keep the daemon/agent-core as a local Node server. Replace the Electron preload bridge and IPC with WebSocket/HTTP. Serve `apps/web` as a normal SPA that connects to `localhost`. Result: ~100% feature parity, runs in a browser tab, but requires the user to run a local backend (not a pure cloud webpage). The UI is already ~95% ready; the work is transport + hosting, not shims.

**Option B — Pure in-browser app (lossy, browser-sandboxed).**
Use IndexedDB (Dexie/localForage) for storage and File System Access API for limited file work. **Drops** agent execution, Docker, browser automation, WhatsApp, and local models — i.e. the core feature set. This is effectively a settings/history viewer, not the product.

Tell me which target (A, B, or a hybrid) and I will proceed to the architecture design (Agent 2) and translation (Agent 3) **for that target**. Producing shim_architecture.json and porting code before this is decided would waste large effort on the wrong foundation.
