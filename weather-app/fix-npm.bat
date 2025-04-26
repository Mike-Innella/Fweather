@echo off
echo This script will fix the "package.json not found" error.
echo.

echo Current directory: %CD%
echo.

echo Checking if we're in the weather-app directory...
if exist package.json (
    echo Found package.json in current directory.
    echo Running npm install...
    npm install
) else (
    echo package.json not found in current directory.
    echo.
    echo Trying to find the correct directory...
    
    if exist weather-app\package.json (
        echo Found package.json in weather-app subdirectory.
        echo Changing to weather-app directory...
        cd weather-app
        echo Running npm install...
        npm install
    ) else (
        echo Could not find package.json in expected locations.
        echo.
        echo Please run this script from the directory containing package.json
        echo or from its parent directory.
    )
)

echo.
echo Script completed.
echo Press any key to exit...
pause > nul
