@echo off
REM ======================================================
REM    Starting Audioscope AI Servers with LLM Support
REM ======================================================

REM Load environment variables from .env if it exists
if exist .env (
    for /f "usebackq delims== tokens=1,2" %%A in (".env") do set %%A=%%B
) else (
    echo [WARNING] .env file not found! Please create a .env file with GEMINI_API_KEY=your_key_here
)

REM Set ENABLE_LLM (can also be set in .env)
set ENABLE_LLM=True

REM Kill any existing servers
echo Stopping existing servers...
taskkill /f /im python.exe 2>nul
timeout /t 2 /nobreak >nul

REM Start Backend Server in background
echo Starting Backend Server with LLM...
cd src\audioscopeai-backend
start /b python app.py > backend.log 2>&1

REM Wait for backend to start
timeout /t 5 /nobreak >nul

REM Start Frontend Server in background
echo Starting Frontend Server...
cd ..\audioscopeai-frontend
start /b python -m http.server 8080 > frontend.log 2>&1

REM Wait a moment for servers to initialize
timeout /t 2 /nobreak >nul

echo.
echo =====================================================
echo   Servers started successfully in background!
echo   Backend: http://localhost:5000 (with LLM support)
echo   Frontend: http://localhost:8080
echo =====================================================
echo.
echo Servers are running in the background.
echo Check backend.log and frontend.log for server output.
echo To stop servers, run: taskkill /f /im python.exe
echo.
echo Press any key to exit this window...
pause >nul 