where npm >nul 2>nul || (
    echo npm is not installed. Aborting.
    exit /b 1
)

@echo off
call npm install
call npm run compile
call npx vsce package
echo All commands executed successfully!
