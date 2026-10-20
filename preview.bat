@echo off
cd /d "%~dp0"
start "" http://localhost:3008/
node scripts\preview-server.mjs preview-build 3008
