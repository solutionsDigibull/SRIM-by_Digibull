# DigiBull UI Update

This note documents the current DigiBull/SRIM UI behavior added on top of the
local web migration.

## Chat Entry

- Home copy is DigiBull-branded: "What will DigiBull handle today?"
- The task input bar has restrained hover/focus motion so it feels responsive
  without jumping around.
- When Auto mode is enabled, the chat input shows a visible DigiBull Auto pill.

## Login

- Login is now a fancy animated DigiBull access screen.
- Three credential modes are visible: UID + password, email + password, and
  mobile number + OTP.
- Two OAuth-style entries are visible: NetBird / Windows and Google.
- NetBird PAT remains the working compact login at the bottom.
- Forgot password and new-user onboarding panels are included.
- Google, OTP, production email/password, forgot password, and onboarding still
  need backend endpoints before they can complete real authentication.

## Auto Model Selection

The model selector includes **Auto · by task type**.

Auto mode is real routing, not just a visual label:

- Simple chat prompts prefer fast/cheap models.
- Coding, debugging, research, scraping, planning, review, and analysis prompts
  prefer stronger models.
- Routing runs before `task:start` using the currently connected provider
  settings.
- If Auto cannot resolve a model, SRIM keeps the current selected provider/model.
- If provider settings or model switching hangs, Auto routing times out and the
  task still starts instead of leaving the UI stuck on `Executing...`.

## Local Models

The Providers screen now places the local model download box below the device
checker.

The box shows:

- Selected model state: no model selected, ready to download, downloading,
  installed, or failed.
- Download progress.
- Local server state: idle or running with a port.
- Runtime target: Auto, GPU, WebGPU, or CPU.

Runtime helper text:

- Auto: best available hardware.
- GPU: CUDA / local GPU.
- WebGPU: browser GPU path, experimental.
- CPU: slow fallback with the widest compatibility.

Manual GPU index routing is not available yet. If the user asks for GPU 0 or GPU
1, SRIM should explain that multi-GPU selection is not exposed yet and that GPU
modes use automatic GPU selection.

## AI Questions

Question-type permission requests render inline as a **DigiBull Question** card.

This gives the agent freedom to ask for missing details while keeping the user
inside the execution flow. The card supports:

- The agent's question text.
- Optional choices.
- A typed custom answer.
- Cancel/send actions.

File and tool permission requests still use the stronger modal treatment because
those actions have higher risk.

## Verification

Current verification performed:

- Web typecheck passes with `pnpm -F @accomplish/web run typecheck`.
- Focused unit tests pass for Auto routing, ModelIndicator behavior, and the
  Auto-routing timeout guard.
- Local Vite app responds on `http://localhost:5173`.
