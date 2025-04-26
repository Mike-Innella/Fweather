@echo off
echo Installing dependencies...
npm install

echo.
echo Choose how to start the app:
echo 1. Use React Scripts (default)
echo 2. Use Webpack
echo.

set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="2" (
    echo Starting the app with Webpack...
    npm run webpack-start
) else (
    echo Starting the app with React Scripts...
    npm start
)
