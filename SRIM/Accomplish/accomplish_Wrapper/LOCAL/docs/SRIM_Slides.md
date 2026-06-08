% Accomplish → SRIM (DigiBull)
% Electron desktop → local web app
% DigiBull.ai · SRIM 3.2

# What it is

- AI agent app (runs OpenCode locally)
- Was: Electron desktop
- Now: browser tab + local backend
- Rebranded: **SRIM / DigiBull**

# Original (Electron)

- React UI ↔ preload bridge (~462 methods)
- Electron main → daemon (Node)
- Daemon: OpenCode + SQLite
- UI was already browser-safe

# Baseline artifact

- `accomplish_Transformed_Chaithanya_Original.zip`
- Original Chaithanya web transform archive
- Size: ~759 MB
- Current SRIM working tree continues from it

# Phase 1 — Convert to web

*(Chaithanya)*

- Removed Electron window
- Added daemon HTTP+SSE server `:9234`
- Browser transport recreates `window.accomplish`
- Login + DigiBull branding
- ~96 of ~148 features wired
- Delivered as the Chaithanya original transform archive

# Phase 2 — Analyse & reverse-engineer

*(Nagabhushana)*

- Compared converted vs original
- Gap analysis: 52 missing (buckets A–D)
- Reverse-engineered the 0.4.14 `.exe`
- asar extract → diff IPC channels

# 0.4.14 .exe — findings

- Newer code than source
- ~124 channels not in source
- New: Browser Panel, Triggered Tasks, llama.cpp, feature flags
- Only minified bundles → need source to port

# Bugs fixed

- **Tasks failed** → API keys now passed to OpenCode
- Provider connect crash (`null.valid`)
- Valid keys wrongly rejected
- Pasted-quote keys broke auth
- Failures now show a reason

# New features

- Centralized addresses (migration-proof)
- DigiBull chat rebrand + motion polish
- Auto model selector (task-aware routing)
- Inline AI question card
- LOCAL LLM advisor (specs → model picks)
- Local model downloads + runtime target
- Appearance: themes / accents / motion
- Test-automation skill
- Developer mode + **MCP manager**
- Speech, Vertex, OpenAI OAuth

# Coverage

- Bucket A (24): **done**
- Bucket B portable: **done**
- HF-local UI: downloads/runtime wired
- Native gaps: per-GPU index, gcloud APIs
- 0.4.14 features: need source
- Desktop-only (tray/updater): N/A

# DigiBull UI update

- Home prompt: "What will DigiBull handle today?"
- Model menu: **Auto · by task type**
- Auto routes simple chat to fast models
- Auto routes code/research/planning to stronger models
- Guardrail: Auto routing times out, task still starts

# Local model UX

- Device checker sits above downloads
- Download box shows idle/downloading/installed/failed
- Runtime targets: Auto, GPU, WebGPU, CPU
- GPU 0 / GPU 1 manual selection: not yet exposed
- Uses automatic GPU selection for GPU modes

# AI questions

- SRIM can surface model questions inline
- No more hidden "it is thinking" for question prompts
- Question card accepts typed answer or choices
- File/tool permissions still use the stronger modal

# MCP — two directions

- **Outbound:** add MCP servers → agent uses them
  - Pre-seeded: Dify, FastMCP, MCP Jungle, Postgres, Superset…
- **Inbound:** external workflows call `/rpc`
  - Bearer key · loopback-only · opt-in flag

# Run it

```
pnpm install
pnpm -F @accomplish/daemon dev   # :9234
pnpm dev:web                     # :5173
```

- Or: `LAUNCH-WEB.bat`

# Status

- Web build works end-to-end
- Providers connect; tasks run
- DigiBull Auto + local model UI verified
- Typecheck and focused UI tests pass
- MCP integration ready
- Roadmap: native subsystems, 0.4.14 source features

# Thank you

DigiBull.ai · Mysore, Karnataka
Initial web transform: Chaithanya
SRIM analysis, remediation, UI update: Nagabhushana Raju S
