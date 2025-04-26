const API_KEY = "cdf925f08107fca1910ea91ca3a3f6d9";

export const fetchWeather = async (
  location,
  unit = "metric",
  setLoading,
  setOverlayVisible
) => {
  setLoading(true);
  setOverlayVisible(true);

  // Validate unit
  const validUnits = ["metric", "imperial", "standard"];
  if (!validUnits.includes(unit)) {
    throw new Error("Invalid unit. Use 'metric', 'imperial', or 'standard'.");
  }

  // Validate location
  let url = "";
  try {
    if (typeof location === "string") {
      // Check if it's a US zip code (5 digits)
      const zipCodeRegex = /^\d{5}$/;
      if (zipCodeRegex.test(location)) {
        // US zip code - append ",us" to ensure it's treated as a US zip code
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${API_KEY}&units=${unit}`;
        console.log("Request URL (by US zip code):", url);
      } else {
        // City name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location
        )}&appid=${API_KEY}&units=${unit}`;
        console.log("Request URL (by city name):", url);
      }
    } else if (
      typeof location === "object" &&
      location.lat != null &&
      location.lon != null &&
      !isNaN(location.lat) &&
      !isNaN(location.lon) &&
      location.lat >= -90 &&
      location.lat <= 90 &&
      location.lon >= -180 &&
      location.lon <= 180
    ) {
      // Latitude/Longitude
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${unit}`;
      console.log("Request URL (by latitude/longitude):", url);
    } else {
      throw new Error("Invalid location format.");
    }

    const res = await fetch(url);
    console.log("API Response Status:", res.status);
    if (!res.ok) throw new Error("Location not found");

    const weatherData = await res.json();
    console.log("API Response Data:", weatherData);

    // Fetch random fun fact
    const funFactRes = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    if (!funFactRes.ok) throw new Error("Fun fact data not found");
    const funFactData = await funFactRes.json();
    console.log("Fun Fact Response:", funFactData);

    return {
      ...weatherData,
      funFact: funFactData.text,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  } finally {
    setTimeout(() => {
      setLoading(false);
      setOverlayVisible(false);
    }, 2800);
  }
};
