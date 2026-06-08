# SRIM — MCP Integration Guide

How Accomplish (SRIM) connects to MCP tools, and how external workflows connect to it.
There are **two directions** — they are independent.

---

## 1. Outbound — Accomplish → MCP servers
*(the agent uses external MCP servers as tools)*

**How it works:** A connection you add is stored as a "connector". When a task
runs, the daemon's config builder (`buildMcpServers`) injects your connectors
into the OpenCode runtime config, so the agent can call those MCP tools.

**How to use:**
1. Open **Settings → General → Developer** and turn **Developer mode** on.
2. Under **MCP connections**, either:
   - click a **Quick-add (SRIM stack)** chip (Dify, FastMCP, MCP Jungle, Postgres,
     Apache Superset, TestSprite, Playwright, Chrome DevTools, Git, Filesystem,
     VibeShip, Report Generator, Accessibility) — it pre-fills the name + a
     localhost placeholder URL, **or**
   - type a **Name** and **URL** manually.
3. Edit the URL to your real endpoint and click **Add**. Add as many as you like.
4. Remove a connection with **Remove**.

**Notes**
- Connections are **remote MCP** (an HTTP MCP endpoint). Local *command-spawn*
  MCP servers are a separate, future option.
- The quick-add URLs are **placeholders** (e.g. `http://localhost:8080/mcp`) —
  replace them with your actual service endpoints.

---

## 2. Inbound — external workflows → Accomplish
*(Dify / FastMCP / your orchestrator drives Accomplish)*

**How it works:** The daemon exposes an HTTP API on `127.0.0.1:9234`. External
systems authenticate with a generated **integration API key** and POST RPC calls.

**Security (important):**
- The API is bound to **127.0.0.1 only** (local host).
- The key is **ignored** unless the daemon is started with
  **`ACCOMPLISH_ENABLE_INTEGRATION_API=1`** (deliberate opt-in; OFF by default).
- When active, the key grants **full** local API access (including running tasks).
  Treat it like a secret.

**How to use:**
1. Start the daemon with the flag:
   ```powershell
   $env:ACCOMPLISH_ENABLE_INTEGRATION_API='1'
   pnpm -F "@accomplish/daemon" dev
   ```
2. In **Settings → General → Developer → Integration API key**, the badge shows
   **ACTIVE**. Copy the key (or **Regenerate**).
3. Call the API from your workflow:
   ```http
   POST http://127.0.0.1:9234/rpc
   Authorization: Bearer <integration-api-key>
   Content-Type: application/json

   { "channel": "task:start", "args": [ { "prompt": "Run the SRIM audit", "files": [] } ] }
   ```

**Common channels**

| Channel | Purpose | Args |
|---|---|---|
| `task:start` | Start an agent task | `[{ prompt, files }]` |
| `task:list` | List tasks | `[]` |
| `task:get` | Get one task (status, messages) | `[taskId]` |
| `task:cancel` | Stop a task | `[taskId]` |
| `provider-settings:get` | Active provider + connected providers | `[]` |
| `system:about` | Provenance (who built it) | `[]` |

**Response shape:** `{ "result": <value> }` on success, `{ "error": "<message>" }`
on failure. A `401` means the key is missing/invalid or the env flag is off.

---

## Where this fits the SRIM 3.2 architecture
- **Dify** orchestrates and POSTs execution requests; **FastMCP** executes and
  calls tools through **MCP Jungle**; **PostgreSQL** holds state; **Apache
  Superset** shows dashboards.
- In that picture, SRIM/Accomplish is reachable **inbound** (Dify triggers
  `task:start`, reads results) and reaches **outbound** to the tool MCPs you add
  in the connection manager.
- The whole stack is intended to run together (e.g. in Docker on one host), which
  is why the inbound API is loopback-only + opt-in.
