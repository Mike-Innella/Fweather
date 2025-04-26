import React from "react";
import "../Styling/AutoLocate.css";

export default function AutoLocate({
  fetchWeather,
  setWeatherData,
  setError,
  setOverlayVisible,
  setLoading,
}) {
  const handleAutoLocate = () => {
    console.log("Auto-locate triggered");
    if (navigator.geolocation) {
      setError(null);
      setOverlayVisible(true); // Show overlay while fetching

      setLoading(true); // Set loading state to true while fetching weather

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation success:", position);
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          // Fetch weather based on coordinates
          fetchWeather(coords, "metric", setLoading, setOverlayVisible)
            .then((data) => {
              setWeatherData(data); // Set fetched weather data
            })
            .catch((err) => {
              console.error(err);
              setError("Failed to fetch weather data.");
            });
        },
        (geoError) => {
          alert("Unable to retrieve your location.");
          console.error(geoError);
          setError("Unable to retrieve your location.");
          setOverlayVisible(false); // Hide overlay if geolocation fails
          setLoading(false); // Ensure loading state is reset if there's an error
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
      setOverlayVisible(false); // Hide overlay if geolocation is unsupported
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="locate__wrap">
      <button className="autoLocateBtn" onClick={handleAutoLocate}>
        <i className="fa fa-crosshairs"></i>
        <span className="locate__text">Use your location</span>
      </button>
    </div>
  );
}
