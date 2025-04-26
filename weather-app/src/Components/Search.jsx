import React, { useState } from "react";
import "../Styling/Global.css";
import "../Styling/Queries.css";
import "../Styling/Search.css";
import "../Styling/Weather.css";

const Search = ({
  fetchWeather,
  setWeatherData,
  loading,
  setLoading,
  setError,
  setOverlayVisible,
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city) {
      setLoading(true);
      setOverlayVisible(true); // Show overlay while fetching

      try {
        const data = await fetchWeather(
          city,
          "metric",
          setLoading,
          setOverlayVisible
        );
        setWeatherData(data); // Set fetched weather data
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data.");
      }

      setCity(""); // Reset input field after submission
    }
  };

  return (
    <section className="search-section" id="section">
      <div className="container">
        <div className="row">
          <div className="search__wrapper" id="searchWrapper">
            <h2>Search Your Location Here!</h2>

            <div className="search__bar">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter a location"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={loading} // Disable input when loading
                  required
                />
                <button className="search__submit" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
