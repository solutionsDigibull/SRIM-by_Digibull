@echo off
setlocal EnableExtensions EnableDelayedExpansion
title DigiBull-SRIM (Accomplish) - Installer
cd /d "%~dp0"

REM ======================================================================
REM  DigiBull-SRIM / Accomplish - one-click installer for Windows
REM  SELF-CONTAINED: uses the Node.js 24.15.0 runtime bundled in the repo,
REM  so it works on a fresh laptop WITHOUT installing Node or winget.
REM  Web (Vite)  : http://localhost:5173
REM  Daemon API  : http://127.0.0.1:9234
REM ======================================================================

set "ROOT=%~dp0"
set "APP_DIR=%ROOT%SRIM\Accomplish\accomplish_Wrapper\LOCAL\SRIM-UI\accomplish_Transformed_Nr\accomplish-react_"
set "BUNDLED_NODE=%APP_DIR%\apps\desktop\resources\nodejs\win32-x64\node-v24.15.0-win-x64"

REM ---- 0. Unblock files (in case the folder was copied via ZIP/USB/download)
REM Runs at most once (marker file), and skips node_modules so it does not crawl
REM the entire dependency tree on every run.
if not exist "%ROOT%.unblocked" (
  echo [0/4] Unblocking files (removing Windows "blocked" flag, one-time)...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-ChildItem -LiteralPath '%ROOT%' -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike '*\node_modules\*' } | Unblock-File -ErrorAction SilentlyContinue" >nul 2>&1
  echo done> "%ROOT%.unblocked"
) else (
  echo [0/4] Files already unblocked - skipping.
)

echo ============================================================
echo   DigiBull-SRIM  -  Installer
echo   App folder: %APP_DIR%
echo ============================================================
echo.

if not exist "%APP_DIR%\package.json" (
  echo [ERROR] Could not find the app at:
  echo         %APP_DIR%
  echo         Make sure you copied the FULL folder with all sub-folders intact.
  goto :FAIL
)

REM ---- 1. Node.js: prefer the bundled runtime ------------------------------
echo [1/4] Setting up Node.js...
if exist "%BUNDLED_NODE%\node.exe" (
  set "PATH=%BUNDLED_NODE%;%PATH%"
  echo       Using bundled Node: %BUNDLED_NODE%
) else (
  echo       Bundled Node not found - looking for system Node...
  where node >nul 2>&1 || call :INSTALL_NODE
)
node -v >nul 2>&1 || ( echo [ERROR] Node.js is not available. & goto :FAIL )
for /f "delims=" %%v in ('node -v') do echo       Node %%v ready.

REM ---- 2. pnpm 10.33.0 via corepack ----------------------------------------
echo [2/4] Enabling pnpm 10.33.0...
call corepack enable >nul 2>&1
call corepack prepare pnpm@10.33.0 --activate >nul 2>&1
call pnpm -v >nul 2>&1
if errorlevel 1 (
  echo       corepack route failed - installing pnpm globally via npm...
  call npm i -g pnpm@10.33.0
  REM npm installs global bins to %APPDATA%\npm, which may not be on PATH yet.
  set "PATH=%APPDATA%\npm;%PATH%"
)
call pnpm -v >nul 2>&1 || ( echo [ERROR] pnpm is not available. & goto :FAIL )
for /f "delims=" %%p in ('pnpm -v') do echo       pnpm %%p ready.

REM ---- 3. Dependency install (optional clean) ------------------------------
echo.
echo [3/4] Dependency install.
choice /c YN /n /m "      Remove old node_modules and do a CLEAN reinstall? [Y/N] "
if errorlevel 2 goto :INSTALL
echo       Cleaning old install...
call :RMDIR "%APP_DIR%\node_modules"
call :RMDIR "%APP_DIR%\apps\daemon\node_modules"
call :RMDIR "%APP_DIR%\apps\desktop\node_modules"
call :RMDIR "%APP_DIR%\apps\web\node_modules"
call :RMDIR "%APP_DIR%\packages\agent-core\node_modules"
echo       Clean done.

:INSTALL
echo       Installing dependencies (pnpm install) - can take several minutes...
cd /d "%APP_DIR%"
set "CI=true"
REM Force a DEV install. If the laptop has NODE_ENV=production set globally,
REM pnpm would SKIP devDependencies (tsup/tsx/typescript) and the daemon build
REM at launch would fail with "Cannot find module tsup" - the backend never
REM starts. --prod=false + NODE_ENV=development guarantees the build tools land.
set "NODE_ENV=development"
call pnpm install --config.engine-strict=false --config.confirmModulesPurge=false --prod=false
if errorlevel 1 ( echo [ERROR] pnpm install failed - see messages above. & goto :FAIL )
echo       Dependencies installed.

REM ---- 3b. Pre-build the backend daemon so it is ready before first launch --
echo       Building backend daemon (tsup)...
call pnpm -F @accomplish/daemon build
if errorlevel 1 ( echo [ERROR] Backend daemon build FAILED - see messages above. & goto :FAIL )
if not exist "%APP_DIR%\apps\daemon\dist\index.js" ( echo [ERROR] Daemon build produced no dist\index.js - backend cannot start. & goto :FAIL )
echo       Backend daemon built OK.

REM ---- 4. Done / offer to launch -------------------------------------------
echo.
echo ============================================================
echo  [4/4] Setup complete.
echo ============================================================
echo.
choice /c YN /n /m "Launch the app now? [Y/N] "
if errorlevel 2 (
  echo You can launch later by running:
  echo   "%APP_DIR%\LAUNCH-WEB.bat"
  goto :DONE
)
call "%APP_DIR%\LAUNCH-WEB.bat"
goto :DONE

REM ==========================================================================
REM  Subroutines
REM ==========================================================================
:RMDIR
if exist "%~1" (
  echo         - removing %~1
  rmdir /s /q "%~1"
)
goto :eof

:INSTALL_NODE
where winget >nul 2>&1
if errorlevel 1 (
  echo [ERROR] No bundled Node found and winget is unavailable.
  echo         Install Node.js 24 LTS from https://nodejs.org and re-run.
  goto :FAIL
)
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
echo       Node installed. CLOSE this window, re-open it, and run INSTALL.bat again.
goto :FAIL

REM ==========================================================================
:FAIL
echo.
echo Installation did NOT complete. Read the message above for the reason.
echo.
pause
exit /b 1

:DONE
echo.
pause
exit /b 0
