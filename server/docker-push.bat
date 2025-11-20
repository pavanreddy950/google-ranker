@echo off
echo ========================================
echo Pushing Google Ranker to Docker Hub
echo ========================================
echo.

cd /d "%~dp0"

echo Tagging image...
docker tag google-ranker:latest scale112/google-ranker:latest
docker tag google-ranker:latest scale112/google-ranker:v1.0

echo.
echo Pushing to Docker Hub (scale112/google-ranker)...
docker push scale112/google-ranker:latest
docker push scale112/google-ranker:v1.0

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Successfully pushed to Docker Hub!
    echo ========================================
    echo.
    echo Image URLs:
    echo   scale112/google-ranker:latest
    echo   scale112/google-ranker:v1.0
    echo.
    echo To pull on another machine:
    echo   docker pull scale112/google-ranker:latest
    echo.
) else (
    echo.
    echo ========================================
    echo Failed to push to Docker Hub!
    echo ========================================
    echo.
    echo Make sure you are logged in:
    echo   docker login
    echo.
)

pause
