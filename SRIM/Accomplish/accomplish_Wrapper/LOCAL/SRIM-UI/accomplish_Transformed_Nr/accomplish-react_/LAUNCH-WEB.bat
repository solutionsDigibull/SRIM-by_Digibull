@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
title Accomplish Web Launcher

echo ============================================================
echo   Accomplish (SRIM) - Web build launcher
echo   Backend daemon  : http://127.0.0.1:9234
echo   Frontend (Vite) : http://localhost:5173
echo ============================================================
echo.

REM ---- 1. Node version check (engines require Node >=24) -------------------
echo [check] Node version:
node -v
node -v | findstr /b "v24 v25 v26" >nul
if errorlevel 1 (
  echo   [note] Node ^<24 detected. The ">=24" is only a warning - this build runs on
  echo          Node 22 once deps are installed for it. Continuing in 3 seconds...
  timeout /t 3 >nul
)

REM ---- 2. Confirm pnpm is available ----------------------------------------
call pnpm -v >nul 2>&1
if errorlevel 1 (
  echo [ERROR] pnpm not found on PATH. Install it with:  npm i -g pnpm
  pause
  exit /b 1
)

REM ---- 3. Install dependencies if missing OR incomplete --------------------
REM apps\daemon\node_modules\tsup is a good "fully linked" sentinel: if it is
REM missing, the install is partial and the daemon build will fail.
set NEED_INSTALL=0
if not exist "node_modules\.pnpm" set NEED_INSTALL=1
if not exist "apps\daemon\node_modules\tsup" set NEED_INSTALL=1
if not exist "apps\web\node_modules\vite" set NEED_INSTALL=1
if "%NEED_INSTALL%"=="1" (
  echo [setup] Dependencies missing/incomplete - running pnpm install...
  echo         ^(CI=true authorizes pnpm to rebuild node_modules cleanly; can take a few minutes^)
  set CI=true
  call pnpm install --config.engine-strict=false --config.confirmModulesPurge=false
  if errorlevel 1 ( echo [ERROR] pnpm install failed - see messages above. & pause & exit /b 1 )
) else (
  echo [ok] Dependencies look complete.
)
echo.

REM ---- 4. Launch backend daemon in its own window --------------------------
echo [start] Launching backend daemon (separate window)...
start "Accomplish DAEMON :9234" cmd /k "call pnpm -F @accomplish/daemon dev"

REM ---- 5. Launch web dev server in its own window --------------------------
echo [start] Launching web dev server (separate window)...
start "Accomplish WEB :5173" cmd /k "call pnpm dev:web"

REM ---- 6. Wait for backend health endpoint ---------------------------------
echo.
echo [wait] Waiting for backend on http://127.0.0.1:9234/health ...
powershell -NoProfile -Command "for($i=0;$i -lt 90;$i++){ try{ if((Invoke-WebRequest 'http://127.0.0.1:9234/health' -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200){ Write-Host '[ok] Backend is UP.'; exit 0 } }catch{}; Start-Sleep 1 }; Write-Host '[warn] Backend did not respond in ~90s (check the DAEMON window for errors).'; exit 1"

REM ---- 7. Wait for the Vite dev server -------------------------------------
echo [wait] Waiting for web server on http://localhost:5173 ...
powershell -NoProfile -Command "for($i=0;$i -lt 60;$i++){ try{ if((Invoke-WebRequest 'http://localhost:5173' -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200){ Write-Host '[ok] Web server is UP.'; exit 0 } }catch{}; Start-Sleep 1 }; Write-Host '[warn] Web server slow - opening anyway.'; exit 1"

REM ---- 8. Open the app in the default browser ------------------------------
echo [open] Opening http://localhost:5173 in your browser...
start "" http://localhost:5173

echo.
echo ============================================================
echo  Two windows opened: "Accomplish DAEMON :9234" and "Accomplish WEB :5173".
echo  Keep them open while testing. To STOP: close both windows (or Ctrl+C in each).
echo  On the login screen use the "Sign in as Tester" button (dev only),
echo  or token:  srim-dev-token   (user: digibull / pass: srim-test-2026)
echo ============================================================
echo.
pause
