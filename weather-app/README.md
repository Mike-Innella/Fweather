# Weather App

A simple and intuitive weather application that provides accurate weather information for locations around the world.

## Features

- Search for weather by city name or US zip code
- Auto-locate feature to detect your current location
- Current weather conditions with visual indicators
- Sunrise and sunset times
- Interesting weather-related fun facts
- Dynamic backgrounds that change based on weather conditions

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed on your computer.
2. Clone this repository or download the source code.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install all dependencies.

## Running the App

### Option 1: Using the Batch File (Windows)

1. Double-click the `start-app.bat` file in the project directory.
2. Choose whether to run the app using React Scripts (option 1) or Webpack (option 2).

### Option 2: Using npm Commands

To start the app using React Scripts:
```
npm start
```

To start the app using Webpack:
```
npm run webpack-start
```

## Troubleshooting

### "package.json not found" Error

If you encounter an error like:
```
npm error code ENOENT
npm error syscall open
npm error path C:\path\to\WeatherAPI\package.json
npm error errno -4058
npm error enoent Could not find package.json
```

This means npm is looking for package.json in the wrong directory. To fix this:

1. Run the `fix-npm.bat` script included in the project.
2. This script will automatically find the correct directory and run npm install.

### React Scripts Not Recognized

If you encounter issues with React Scripts not being recognized:

1. Try using the Webpack option when running the app.
2. Make sure all dependencies are properly installed by running `npm install` again.
3. Check that you have the correct version of Node.js installed (v14 or higher recommended).

## Building for Production

To build the app for production:

```
npm run build
```

Or using Webpack:

```
npm run webpack-build
```

## Technologies Used

- React
- JavaScript
- CSS
- OpenWeatherMap API
- EmailJS for contact form

## License

This project is licensed under the MIT License.
