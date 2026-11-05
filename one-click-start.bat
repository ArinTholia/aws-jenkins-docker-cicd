@echo off
title CloudBite Cafe - 1-Click Dynamic Web Application
echo ============================================================
echo   CloudBite Cafe (AWS Cloud + Git + Jenkins + Docker)
echo ============================================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo [1/3] Installing Node.js dependencies...
    call npm install
) else (
    echo [1/3] Dependencies already installed.
)

echo.
echo [2/3] Running Automated CI Unit Tests...
call npm test

echo.
echo [3/3] Starting Dynamic Web Application on http://localhost:3000 ...
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"
node server.js
pause
