@echo off
echo ========================================
echo Starting Google Ranker Backend Container
echo ========================================
echo.

cd /d "%~dp0"

echo Starting container with docker-compose...
docker-compose up -d

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Container started successfully!
    echo ========================================
    echo.
    echo Backend is running on http://localhost:5000
    echo.
    echo To view logs:
    echo   docker-compose logs -f backend
    echo.
    echo To stop the container:
    echo   docker-compose down
    echo.
) else (
    echo.
    echo ========================================
    echo Failed to start container!
    echo ========================================
    echo.
    echo Please run docker-build.bat first if you haven't built the image.
    echo.
)

pause
