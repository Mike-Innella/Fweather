import React, { useState, useEffect } from "react";
import "../../Styling/Global.css";
import "../../Styling/Queries.css";
import "../../Styling/Weather.css";
import "../../Styling/Tabs.css";

const WeatherDisplay = ({
  weatherData,
  setWeatherData,
  loading,
  temperatureUnit,
  toggleTemperatureUnit,
  overlayVisible,
  setOverlayVisible,
  error,
}) => {
  const [animationState, setAnimationState] = useState("");
  const [activeTab, setActiveTab] = useState("current");

  useEffect(() => {
    if (loading && !weatherData) {
      setOverlayVisible(true);
    }

    if (!loading && weatherData) {
      setTimeout(() => {
        setOverlayVisible(false);
      }, 800);
      setAnimationState("slide-in");
    }
  }, [loading, weatherData, setOverlayVisible]);

  const handleCloseWeather = () => {
    setAnimationState("slide-out");
    setTimeout(() => {
      setWeatherData(null);
      setOverlayVisible(false);
      setAnimationState("");
    }, 800);
  };

  // Function to determine the weather background class based on weather condition
  const getWeatherBackgroundClass = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return '';
    }
    
    const weatherId = weatherData.weather[0].id;
    
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
      return 'bg-thunderstorm';
    }
    // Drizzle or Rain
    else if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
      return 'bg-rain';
    }
    // Snow
    else if (weatherId >= 600 && weatherId < 700) {
      return 'bg-snow';
    }
    // Atmosphere (fog, mist, etc.)
    else if (weatherId >= 700 && weatherId < 800) {
      return 'bg-atmosphere';
    }
    // Clear
    else if (weatherId === 800) {
      return 'bg-clear';
    }
    // Clouds
    else if (weatherId > 800 && weatherId < 900) {
      return 'bg-clouds';
    }
    
    return '';
  };

  const handleTemperatureToggle = (e) => {
    e.stopPropagation();
    toggleTemperatureUnit();
  };

  const convertTemperature = (temp) =>
    temperatureUnit === "metric"
      ? `${temp.toFixed(1)}°C`
      : `${((temp * 9) / 5 + 32).toFixed(1)}°F`;

  const convertWindSpeed = (speed) =>
    temperatureUnit === "metric"
      ? `${(speed * 3.6).toFixed(2)} kph`
      : `${(speed * 2.23694).toFixed(2)} mph`;

  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  console.log("Full weatherData:", weatherData);
  console.log(weatherData?.name); // Log the location name safely

  return (
    <>
      {loading && overlayVisible && (
        <div className="loading-overlay visible">
          <div className="spin__wrapper">
            <div className="spinner">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
            <p className="fetching-text">Fetching weather data...</p>
          </div>
        </div>
      )}
      
      {!loading && error && (
        <div className="error-message">
          <i className="fa fa-exclamation-triangle"></i>
          <p>{error}</p>
          <button onClick={() => setOverlayVisible(false)}>Dismiss</button>
        </div>
      )}

      {!loading && weatherData && !overlayVisible && (
        <>
          <div className="weather__overlay"></div>

          <div className={`weather__result ${animationState} ${getWeatherBackgroundClass()}`}>
            <div className="weather__content">
              <h3>Weather in {weatherData?.name || "Unknown Location"}</h3>{" "}
              {/* Safe access to weatherData.name */}
              {/* Tabs */}
              <div className="tabs">
                <button
                  className={`tab ${activeTab === "current" ? "active" : ""}`}
                  onClick={() => setActiveTab("current")}
                >
                  Current Weather
                </button>
                <button
                  className={`tab ${activeTab === "sunTimes" ? "active" : ""}`}
                  onClick={() => setActiveTab("sunTimes")}
                >
                  Sunrise & Sunset
                </button>
                <button
                  className={`tab ${activeTab === "funFact" ? "active" : ""}`}
                  onClick={() => setActiveTab("funFact")}
                >
                  Fun Fact
                </button>
              </div>
              {/* Tab Content */}
              <div className="tab-content">
                <div className={`tabs-content ${activeTab}`}>
                  {activeTab === "current" && (
                    <div className="tab-content-inner">
                      {/* Temperature */}
                      {weatherData.main?.temp && (
                        <p>
                          🌡️ Temperature:{" "}
                          {convertTemperature(weatherData.main.temp)}
                        </p>
                      )}

                      {/* Weather description with icon */}
                      {weatherData.weather?.[0] && (
                        <p>
                          <img 
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                            alt={weatherData.weather[0].description}
                            className="weather-icon"
                          />
                          Condition: {weatherData.weather[0].description}
                        </p>
                      )}

                      {/* Wind Speed */}
                      {weatherData.wind && weatherData.wind.speed !== undefined && (
                        <p>
                          💨 Wind Speed:{" "}
                          {convertWindSpeed(weatherData.wind.speed)}
                        </p>
                      )}

                      {/* Humidity */}
                      {weatherData.main?.humidity && (
                        <p>
                          💧 Humidity: {weatherData.main.humidity}%
                        </p>
                      )}

                      {/* Feels Like Temperature */}
                      {weatherData.main?.feels_like && (
                        <p>
                          🌡️ Feels Like: {convertTemperature(weatherData.main.feels_like)}
                        </p>
                      )}

                      {/* Pressure */}
                      {weatherData.main?.pressure && (
                        <p>
                          📊 Pressure: {weatherData.main.pressure} hPa
                        </p>
                      )}

                      {/* Visibility */}
                      {weatherData.visibility && (
                        <p>
                          👁️ Visibility: {(weatherData.visibility / 1000).toFixed(1)} km
                        </p>
                      )}

                      <button
                        className="unit__toggle"
                        onClick={handleTemperatureToggle}
                      >
                        Switch to{" "}
                        {temperatureUnit === "metric" ? "Imperial" : "Metric"}
                      </button>
                    </div>
                  )}

                  {activeTab === "sunTimes" && (
                    <div className="tab-content-inner">
                      {weatherData.sys?.sunrise && (
                        <p>
                          🌅 Sunrise: {convertTime(weatherData.sys.sunrise)}{" "}
                          local time
                        </p>
                      )}
                      {weatherData.sys?.sunset && (
                        <p>
                          🌇 Sunset: {convertTime(weatherData.sys.sunset)} local
                          time
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "funFact" && (
                    <div className="tab-content-inner">
                      {/* Assuming 'funFact' is passed in weatherData */}
                      {weatherData.funFact && <p>🎉 {weatherData.funFact}</p>}
                    </div>
                  )}
                </div>
              </div>
              {/* Always-visible close button */}
              <button className="close-weather" onClick={handleCloseWeather}>
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WeatherDisplay;
