# syntax=docker/dockerfile:1
# ---------------------------------------------------------------------------
# DigiBull-SRIM / Accomplish - WEB build (daemon :9234 + web :5173)
# This runs the headless web build only. The Electron *desktop* app is a GUI
# and is intentionally not launched here (use INSTALL.bat on Windows for that).
# ---------------------------------------------------------------------------
FROM node:24-bookworm

# Native toolchain for better-sqlite3 / node-gyp
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# pnpm pinned to the version this repo expects
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

WORKDIR /app

# Don't pull the Electron binary or optional native extras inside the container
ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1 \
    CI=true \
    HOST=0.0.0.0

# Copy the whole workspace (node_modules excluded via .dockerignore) and install
COPY . .
RUN pnpm install --config.engine-strict=false --config.confirmModulesPurge=false

EXPOSE 5173 9234

# Start the daemon and the Vite web server together. Vite is bound to 0.0.0.0
# so it is reachable from the host.
CMD ["sh","-c","pnpm -F @accomplish/daemon dev & pnpm -F @accomplish/web dev -- --host 0.0.0.0 --port 5173"]
