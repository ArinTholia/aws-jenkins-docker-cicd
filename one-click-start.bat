@echo off
title CloudPulse - 1-Click Dynamic CI/CD Web Application
echo ============================================================
echo   CloudPulse DevOps Project (AWS + Git + Jenkins + Docker)
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
start http://localhost:3000
call npm start
