@echo off
echo ========================================
echo Building Google Ranker Backend Docker Image
echo ========================================
echo.

cd /d "%~dp0"

echo Building Docker image...
docker build -t google-ranker:latest .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Build completed successfully!
    echo ========================================
    echo.
    echo To run the container, use:
    echo   docker-compose up -d
    echo.
    echo Or for production:
    echo   docker-compose -f docker-compose.production.yml up -d
    echo.
) else (
    echo.
    echo ========================================
    echo Build failed! Please check the errors above.
    echo ========================================
    echo.
)

pause
