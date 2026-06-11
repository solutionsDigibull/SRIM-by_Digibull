# DigiBull-SRIM (Accomplish) — Setup Guide

Clone → Install → Setup → Launch, end to end. Works on any Windows laptop
(C:, D:, E: — the scripts auto-adapt to wherever you put the folder).

- **Web UI:** http://localhost:5173
- **Backend daemon / API:** http://127.0.0.1:9234
- **Dev login:** “Sign in as Tester”, or token `srim-dev-token` (user `digibull` / pass `srim-test-2026`)

> Companion slide deck: **`SRIM_Setup_Guide.pptx`** (same folder) — its buttons link straight to `INSTALL.bat` / `LAUNCH-WEB.bat`.

---

## Prerequisites

| Need | Why | Get it |
|------|-----|--------|
| **Git** | to clone | https://git-scm.com/download/win |
| **Git LFS** | the big `*.zip` / `*.exe` are stored in LFS | https://git-lfs.com |
| Node.js | **NOT required** — a Node 24.15.0 runtime is bundled in the repo | — |
| Docker *(optional)* | only for the Docker route (Option B) | https://docs.docker.com/get-docker |

---

## Step 0 — Clone the repo

```bash
git clone https://github.com/solutionsDigibull/SRIM-by_Digibull.git
cd SRIM-by_Digibull
git lfs install
git lfs pull
```

`git lfs pull` downloads the large binaries (`Accomplish.zip`, installers).
You can clone to **any drive** — `C:\`, `D:\`, a USB stick — the launchers use
their own folder location, so nothing is hard-coded to one machine.

---

## Step 1 — Install & set up (Windows, recommended)

**Double-click `INSTALL.bat`** at the repo root.

It is self-contained and does the whole setup for you:

1. **Unblocks** files (handles the Windows “this file came from another PC” flag).
2. Uses the **bundled Node.js 24.15.0** — you do **not** need Node or winget installed.
3. Activates **pnpm 10.33.0** via corepack.
4. Asks whether to do a **clean reinstall** (wipe old `node_modules`) — choose **Y** if a previous attempt failed.
5. Runs `pnpm install` (dev tools included).
6. **Rebuilds `better-sqlite3`** for Node 24 — this is the step that prevents the
   `NODE_MODULE_VERSION 127 vs 137` daemon crash (“Failed to fetch” on the login page).
7. **Pre-builds** the backend daemon and verifies it.
8. Offers to launch immediately.

> **Tip:** if anything looks broken, just run `INSTALL.bat` again and pick the
> **clean reinstall** option — it rebuilds everything from scratch for Node 24.

---

## Step 2 — Launch

**Double-click `LAUNCH-WEB.bat`** in:

```
SRIM/Accomplish/accomplish_Wrapper/LOCAL/SRIM-UI/accomplish_Transformed_Nr/accomplish-react_/LAUNCH-WEB.bat
```

It will:

1. **Free stale ports** (`9234` / `9230` / `5173`) so a relaunch never hits “port in use”.
2. Open a **DAEMON** window (backend on `:9234`).
3. Open a **WEB** window (Vite on `:5173`).
4. Wait for the backend health check, then open `http://localhost:5173` in your browser.

Keep both windows open while using the app. To stop: close both windows.

---

## Step 3 — Log in

On the login screen:

- Click **“Sign in as Tester”**, **or**
- Token: `srim-dev-token`, **or**
- Username `digibull` / Password `srim-test-2026`

---

## Option B — Docker (any OS with Docker)

From the repo root:

```bash
docker compose up --build
```

Then open <http://localhost:5173> (daemon health at <http://127.0.0.1:9234/health>).
This runs the **headless web build** (daemon + Vite). The Electron **desktop** GUI
is not run in Docker — use the Windows route (Option A) for the desktop app.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| **“Failed to fetch” on login** | The daemon (`:9234`) isn’t running — usually it crashed at startup. | Look at the **DAEMON** window for the error; re-run `INSTALL.bat` (clean) then `LAUNCH-WEB.bat`. |
| **`NODE_MODULE_VERSION 127 … requires 137`** in the daemon window | `better-sqlite3` was built for a different Node than the one running it. | `INSTALL.bat` now rebuilds it for Node 24 — re-run `INSTALL.bat`. |
| **“Port 5173 / 9234 already in use”** | A previous daemon/web window is still open. | `LAUNCH-WEB.bat` now frees these automatically; or close the old windows. |
| **The `.bat` window flashes and closes / won’t launch** | Old copy with Unix line endings or blocked file. | Use the current `INSTALL.bat` (CRLF + auto-unblock). |
| **`tsup` “Cannot find module”** when daemon builds | Dev dependencies were skipped (machine had `NODE_ENV=production`). | `INSTALL.bat` installs with `--prod=false`; re-run it. |
| **`git lfs` files missing / tiny** | LFS not pulled. | `git lfs install && git lfs pull` |
