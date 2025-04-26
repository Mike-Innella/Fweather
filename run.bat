@echo off
echo Weather App Launcher
echo ====================
echo.

echo Checking for weather-app directory...
if exist weather-app (
    echo Found weather-app directory.
    echo.
    echo Choose an option:
    echo 1. Run the app
    echo 2. Fix npm issues
    echo 3. Exit
    echo.
    
    set /p choice="Enter your choice (1-3): "
    
    if "%choice%"=="1" (
        echo.
        echo Launching the app...
        cd weather-app
        call start-app.bat
    ) else if "%choice%"=="2" (
        echo.
        echo Running fix script...
        cd weather-app
        call fix-npm.bat
    ) else (
        echo.
        echo Exiting...
    )
) else (
    echo Could not find weather-app directory.
    echo Please run this script from the WeatherAPI directory.
    echo.
    echo Press any key to exit...
    pause > nul
)
