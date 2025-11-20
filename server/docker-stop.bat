@echo off
echo ========================================
echo Stopping Google Ranker Backend Container
echo ========================================
echo.

cd /d "%~dp0"

echo Stopping container...
docker-compose down

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Container stopped successfully!
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo Failed to stop container!
    echo ========================================
    echo.
)

pause
