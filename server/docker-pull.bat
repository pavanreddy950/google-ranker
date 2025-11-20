@echo off
echo ========================================
echo Pulling Google Ranker from Docker Hub
echo ========================================
echo.

cd /d "%~dp0"

echo Pulling latest image from Docker Hub...
docker pull scale112/google-ranker:latest

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Tagging as local image...
    docker tag scale112/google-ranker:latest google-ranker:latest
    
    echo.
    echo ========================================
    echo Successfully pulled from Docker Hub!
    echo ========================================
    echo.
    echo To run the container:
    echo   docker-compose up -d
    echo.
    echo Or run directly:
    echo   docker run -d --name google-ranker -p 5000:5000 google-ranker:latest
    echo.
) else (
    echo.
    echo ========================================
    echo Failed to pull from Docker Hub!
    echo ========================================
    echo.
)

pause
