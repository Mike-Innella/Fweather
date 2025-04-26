import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Search from "./Components/Search";
import Modals from "./Components/Modals";
import { fetchWeather } from "./Components/Utilities/FetchWeather";
import "font-awesome/css/font-awesome.min.css";
import AutoLocate from "./Components/AutoLocate";
import WeatherDisplay from "./Components/Utilities/WeatherDisplay";
import "./Styling/Global.css";
import "./Styling/Queries.css";

// Initialize EmailJS
emailjs.init("cePFoU8dvsaDAlAyz");

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const checkSystemTemperature = () => {
    // Get user's locale
    const userLocale = navigator.language || navigator.userLanguage;
    
    // Countries that use imperial units (US, Liberia, Myanmar)
    const imperialCountries = ['en-US', 'en-LR', 'en-MM'];
    
    // Check if user's locale matches any imperial country code
    const systemUnit = imperialCountries.some(country => 
      userLocale.startsWith(country) || userLocale === country.split('-')[1]
    ) ? "imperial" : "metric";
    
    setTemperatureUnit(systemUnit);
    console.log(`Detected system temperature unit: ${systemUnit} based on locale: ${userLocale}`);
  };

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === "metric" ? "imperial" : "metric";
    setTemperatureUnit(newUnit);
    localStorage.setItem("temperatureUnit", newUnit);
  };
  

  const toggleDarkTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.body.classList.remove("dark-theme", "light-theme");
      document.body.classList.add(newTheme ? "dark-theme" : "light-theme");
      return newTheme;
    });
  };

  const handleCloseAbout = () => setIsAboutOpen(false);
  const handleCloseContact = () => setIsContactOpen(false);
  const handleOpenAbout = (e) => {
    e?.stopPropagation();
    setIsAboutOpen(true);
  };
  const handleOpenContact = (e) => {
    e?.stopPropagation();
    setIsContactOpen(true);
  };
  const onBackgroundClick = () => {
    setIsAboutOpen(false);
    setIsContactOpen(false);
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await emailjs.sendForm(
        "service_mygmail",
        "template_dfltemailtemp",
        e.target,
        "cePFoU8dvsaDAlAyz"
      );
      setContactLoading(false);
      setContactSuccess(true);
      
      // Reset form and success state after delay
      setTimeout(() => {
        setContactForm({ name: "", email: "", message: "" });
        setContactSuccess(false);
        setIsContactOpen(false);
      }, 3200);
    } catch (error) {
      setContactLoading(false);
      alert("There was a problem sending your message. Please try again.");
      console.error("EmailJS Error:", error);
    }
  };

  useEffect(() => {
    const savedTemperatureUnit = localStorage.getItem("temperatureUnit");
    if (savedTemperatureUnit) {
      setTemperatureUnit(savedTemperatureUnit);
    } else {
      checkSystemTemperature();
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      const isDark = savedTheme === "dark";
      setIsDarkTheme(isDark);
      document.body.classList.remove("dark-theme", "light-theme");
      document.body.classList.add(isDark ? "dark-theme" : "light-theme");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkTheme(prefersDark);
      document.body.classList.remove("dark-theme", "light-theme");
      document.body.classList.add(prefersDark ? "dark-theme" : "light-theme");
    }
  }, []);

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : ""}`}>
      <Header
        onToggleTheme={toggleDarkTheme}
        onAboutClick={handleOpenAbout}
        onContactClick={handleOpenContact}
      />

      <Modals
        isAboutOpen={isAboutOpen}
        isContactOpen={isContactOpen}
        onCloseAbout={handleCloseAbout}
        onCloseContact={handleCloseContact}
        onSubmitContact={handleSubmitContact}
        contactForm={contactForm}
        onContactChange={handleContactChange}
        onBackgroundClick={onBackgroundClick}
        isLoading={contactLoading}
        isSuccess={contactSuccess}
      />

      <Search
        fetchWeather={fetchWeather}
        setWeatherData={setWeatherData}
        setLoading={setLoading}
        setOverlayVisible={setOverlayVisible}
        loading={loading}
        error={error}
        setError={setError}
      />

      <AutoLocate
        fetchWeather={fetchWeather}
        setWeatherData={setWeatherData}
        loading={loading}
        setLoading={setLoading}
        setOverlayVisible={setOverlayVisible}
        error={error}
        setError={setError}
      />

      <WeatherDisplay
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        loading={loading}
        temperatureUnit={temperatureUnit}
        toggleTemperatureUnit={toggleTemperatureUnit}
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
        error={error}
      />
      
      <Footer 
        onAboutClick={handleOpenAbout}
        onContactClick={handleOpenContact}
      />
    </div>
  );
}

export default App;
