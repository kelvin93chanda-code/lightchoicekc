@echo off
cd /d %~dp0

start "" cmd /c "npx http-server -p 5500"

timeout /t 2 >nul

start msedge --app="http://127.0.0.1:5500/index.html"