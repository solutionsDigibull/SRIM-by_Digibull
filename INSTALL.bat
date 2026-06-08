@echo off
setlocal enabledelayedexpansion
title DigiBull-SRIM (Accomplish) - Auto Installer
cd /d "%~dp0"

REM ======================================================================
REM  DigiBull-SRIM / Accomplish - one-click installer for Windows
REM  Target app  : SRIM\Accomplish\accomplish_Wrapper\LOCAL\SRIM-UI\
REM                accomplish_Transformed_Nr\accomplish-react_   (the LIVE "Nr" build)
REM  Requires    : Node.js 24.x  +  pnpm 10.33.0   (installed automatically)
REM  Web (Vite)  : http://localhost:5173
REM  Daemon API  : http://127.0.0.1:9234
REM ======================================================================

set "APP_DIR=%~dp0SRIM\Accomplish\accomplish_Wrapper\LOCAL\SRIM-UI\accomplish_Transformed_Nr\accomplish-react_"

echo ============================================================
echo   DigiBull-SRIM  -  Auto Installer
echo   App folder: %APP_DIR%
echo ============================================================
echo.

if not exist "%APP_DIR%\package.json" (
  echo [ERROR] Could not find the app at:
  echo         %APP_DIR%
  echo         Make sure you cloned the FULL repository (folders intact).
  pause & exit /b 1
)

REM ---- 1. Ensure Node.js 24+ ------------------------------------------------
echo [1/4] Checking Node.js...
where node >nul 2>&1
if errorlevel 1 (
  echo       Node.js not found - attempting install via winget...
  call :INSTALL_NODE
) else (
  for /f "tokens=1 delims=." %%v in ('node -v') do set "NODE_MAJOR=%%v"
  set "NODE_MAJOR=!NODE_MAJOR:v=!"
  echo       Found Node !NODE_MAJOR!.x
  if !NODE_MAJOR! LSS 24 (
    echo       Node ^< 24 detected - attempting upgrade via winget...
    call :INSTALL_NODE
  )
)
node -v >nul 2>&1 || ( echo [ERROR] Node.js still not available. Install Node 24 LTS from https://nodejs.org and re-run. & pause & exit /b 1 )

REM ---- 2. Ensure pnpm 10.33.0 via corepack ----------------------------------
echo [2/4] Enabling pnpm 10.33.0 via corepack...
call corepack enable >nul 2>&1
call corepack prepare pnpm@10.33.0 --activate
call pnpm -v >nul 2>&1
if errorlevel 1 (
  echo       corepack route failed - installing pnpm globally via npm...
  call npm i -g pnpm@10.33.0
)
call pnpm -v >nul 2>&1 || ( echo [ERROR] pnpm not available. Run:  npm i -g pnpm@10.33.0  & pause & exit /b 1 )
for /f %%p in ('pnpm -v') do echo       pnpm %%p ready.

REM ---- 3. Install dependencies ----------------------------------------------
echo [3/4] Installing dependencies (pnpm install) - this can take several minutes...
cd /d "%APP_DIR%"
set CI=true
call pnpm install --config.engine-strict=false --config.confirmModulesPurge=false
if errorlevel 1 ( echo [ERROR] pnpm install failed - see messages above. & pause & exit /b 1 )
echo       Dependencies installed.

REM ---- 4. Done / offer to launch --------------------------------------------
echo.
echo ============================================================
echo  [4/4] Setup complete.
echo  To START the app now, this will run LAUNCH-WEB.bat
echo  (opens daemon :9234 + web :5173 and your browser).
echo ============================================================
echo.
choice /c YN /m "Launch the app now"
if errorlevel 2 ( echo You can launch later with: "%APP_DIR%\LAUNCH-WEB.bat" & pause & exit /b 0 )
call "%APP_DIR%\LAUNCH-WEB.bat"
exit /b 0

:INSTALL_NODE
where winget >nul 2>&1
if errorlevel 1 (
  echo [ERROR] winget not available. Please install Node.js 24 LTS manually from:
  echo         https://nodejs.org/en/download
  pause & exit /b 1
)
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
echo       Node installed. NOTE: you may need to CLOSE and re-open this window
echo       so the new PATH takes effect, then run INSTALL.bat again.
goto :eof
