# Accomplish 0.4.14 (.exe) vs local source — feature delta

**Inspected:** `E:\Accomplish\Accomplish-0.4.14-win-x64.exe` (294 MB NSIS installer, built 2026-04-03)
**Method:** extracted `$PLUGINSDIR/app-64.7z` → `resources/app.asar` (35 MB, 4313 files), parsed the asar header, and diffed IPC channel string literals in the packaged main bundles against the `ELECTRON/` and converted source trees.
**Generated:** 2026-06-03

---

## Key facts (read first)

1. **The installer is labeled 0.4.14, but the app's internal `package.json` version is `0.1.0`** — same label as your source. The version field was never bumped; the *code*, however, is newer (see below).
2. **The `.exe` ships only minified/bundled JS** (hashed filenames like `dist-electron/main/index-ChliSiZl.js`, 2.5 MB). There is **no TypeScript source inside.** Features can be *enumerated* from it but **cannot be cleanly ported** into your TS monorepo from the bundle.
3. **Native modules bundled (unpacked):** `better-sqlite3`, `node-pty`, `jszip`, `opencode-ai`, `opencode-windows-x64`, `opencode-windows-x64-baseline`. `node-pty` (pseudo-terminal) is the notable addition.
4. **Channel inventory:** 288 channel-like literals in the exe vs 257 in source; **~124 appear in the exe but not your source** (after filtering build/library noise).

---

## Features in 0.4.14 that your source does NOT have (verified)

Confidence = how sure I am it's genuinely absent from source (checked file counts across both trees).

| Feature | Channels in exe | In source? | Confidence |
| --- | --- | --- | --- |
| **Browser Panel** (embedded in-app browser: navigate, back/forward, thumbnails, mini-mode, multi-task views, presentation mode) | ~40 (`browser-panel:*`, `browser-panel-manager:*`) | No (only 1 unrelated MCP-tool hit) | **High** |
| **Triggered Tasks** (event/condition-triggered task runs) | 12 (`triggered-task:*`) | No (0 files) | **High** |
| **Local model inference via llama.cpp** (download/start/stop models, context size, default-model prep) | ~21 (`llama-cpp:*`, `local-model:*`) | Barely (1 incidental mention) | **High** |
| **Feature flags** | 1 (`feature-flags:update`) | No (0 files) | **High** |
| **Auto model routing** (suggest/connect/update routing config) | 4 (`auto-model-routing:*`) | Partial (1 file) | Medium |
| **Ollama derived models** (create/delete derived models) | 2 (`ollama:create-derived-model`, `ollama:delete-derived-model`) | Unclear | Medium |
| **Expanded Accomplish AI** (classify, proxy, usage) | 3 (`accomplish-ai:classify/proxy/usage`) | Partial | Medium |
| Enterprise auth (`enterprise:auth:start/logout`) | 2 | **Yes, present in source (5 files)** | — (not new) |

> Noise excluded from the above: `node:*`, `build:*`, `format:*`, `text-align:*`, `https-proxy-agent:*`, `urn:*`, `about:blank` — these are bundled-library/CSS/URL strings, not app features.

---

## The honest recommendation

Your instinct was correct — **0.4.14 is ahead of your source.** But you cannot add these features from the `.exe`, because it contains only minified bundles. The right ways to get them, in order of preference:

1. **Get the 0.4.14 *source*** (the upstream Accomplish repo at that release/tag or commit). Then it's a normal source merge into the converted app. This is the only clean path to maintainable code.
2. If source is unavailable, **re-implement** the wanted features (e.g., Browser Panel, local llama.cpp models) against the bundled JS as a *behavioral spec* — significant effort, and Browser Panel specifically relies on Electron `WebContentsView`, which has **no pure-browser equivalent** (it'd need the desktop shell or an `<iframe>`/`<webview>` redesign).
3. **Skip** the desktop-only ones for the web migration (Browser Panel, anything needing `node-pty`/local GPU inference won't run in a browser tab anyway).

## Artifacts kept in `LOCAL/exe-inspect-0.4.14/`
- `asar-filelist.txt` — all 4313 packaged files
- `main-files.txt` — the 24 main-process bundle files
- `inner-package.json` — the packaged app's package.json
- (the 294 MB `app-64.7z` and 35 MB `app.asar` can be deleted — see chat)
