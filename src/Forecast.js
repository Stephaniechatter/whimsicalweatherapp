import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./Weather";
import Forecast from "./Forecast";

function App() {
  const [city, setCity] = useState("New York");
  const [temperature, setTemperature] = useState(75);
  const [description, setDescription] = useState("🌤️ Clear Sky");
  const [humidity, setHumidity] = useState(60);
  const [windSpeed, setWindSpeed] = useState(5);
  const [time, setTime] = useState("");
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      // Simulated weather data
      setTemperature(Math.floor(Math.random() * 41));
      setDescription("🌤️ Clear Sky");
      setHumidity(Math.floor(Math.random() * 101));
      setWindSpeed(Math.floor(Math.random() * 21));

      // Simulated time
      const currentTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      setTime(currentTime);

      // Simulated forecast data
      const days = ["Mon", "Tue", "Wed", "Thu"];
      const icons = ["☀️", "⛅️", "🌧️", "🌦️"];
      const forecast = days.map((day, index) => ({
        day,
        icon: icons[index],
      }));
      setForecastData(forecast);
    };

    fetchWeatherData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to handle city search
  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value;
    setCity(cityInput);
    // Simulate fetching data for the new city (temperature, weather description, etc.)
    setTemperature(Math.floor(Math.random() * 41));
    setDescription("🌤️ Clear Sky");
    setHumidity(Math.floor(Math.random() * 101));
    setWindSpeed(Math.floor(Math.random() * 21));
    // Simulate updating time
    const currentTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setTime(currentTime);
  };

  return (
    <div className="weather-app">
      <header>
        <form className="search-form" id="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            name="city"
            placeholder="Enter a city..."
            required
            id="search-form-input"
            className="search-form-input"
          />
          <input
            type="submit"
            value="Search"
            className="search-form-button"
          />
        </form>
      </header>
      <main>
        {/* Displayed city information */}
        <div className="default-city-info">
          <div className="weather-app-container">
            <div className="weather-app-data">
              <h1 className="default-city-name">{city}</h1>
              <p className="weather-app-details">
                Temperature: <strong id="temperature">{temperature}°C</strong>,
                Humidity: <strong id="humidity">{humidity}%</strong>,
                Wind: <strong id="wind-speed">{windSpeed} km/h</strong>,
                Time: <strong id="time">{time}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="forecast">
          {forecastData.map((forecastItem, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-day">{forecastItem.day}</div>
              <div className="forecast-icon">{forecastItem.icon}</div>
            </div>
          ))}
        </div>

        {/* Additional Weather Component */}
        <Weather city={city} />
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      This project was coded by{" "}
      <a
        href="https://github.com/Stephaniechatter"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stephanie White
      </a>{" "}
      and is open-sourced on{" "}
      <a
        href="https://github.com/your-github-repo"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>{" "}
      and hosted on{" "}
      <a
        href="https://www.netlify.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Netlify
      </a>
      .
    </footer>
  );
}

export default App;
