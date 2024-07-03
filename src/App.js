import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [temperature, setTemperature] = useState(75);
  const [description, setDescription] = useState("☀️ Sunny");
  const [humidity, setHumidity] = useState(60);
  const [windSpeed, setWindSpeed] = useState(5);
  const [time, setTime] = useState("");
  const [forecast] = useState([
    { day: "Mon", emoji: "☀️" },
    { day: "Tue", emoji: "🌤️" },
    { day: "Wed", emoji: "⛅" },
    { day: "Thu", emoji: "🌦️" },
  ]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setTemperature(Math.floor(Math.random() * 41));
      setDescription("☀️ Sunny");
      setHumidity(Math.floor(Math.random() * 101));
      setWindSpeed(Math.floor(Math.random() * 21));
      const currentTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      setTime(currentTime);
    };

    fetchWeatherData();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value;
    setCity(cityInput);
    setTemperature(Math.floor(Math.random() * 41));
    setDescription("☀️ Sunny");
    setHumidity(Math.floor(Math.random() * 101));
    setWindSpeed(Math.floor(Math.random() * 21));
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
          <input type="submit" value="Search" className="search-form-button" />
        </form>
      </header>
      <main>
        <div className="weather-app-data">
          <h1 className="default-city-name">{city}</h1>
          <p className="weather-app-image">{description}</p>
          <p className="weather-app-details">
            Temperature: <strong>{temperature}°C</strong>, Humidity:{" "}
            <strong>{humidity}%</strong>, Wind: <strong>{windSpeed} km/h</strong>,
            Time: <strong>{time}</strong>
          </p>
        </div>

        <div className="forecast-container">
          <h2>4-Day Forecast</h2>
          <div className="forecast-list">
            {forecast.map((item, index) => (
              <div key={index} className="forecast-item">
                <p>{item.emoji}</p>
                <p>{item.day}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      This project was coded by Stephanie White and is{" "}
      <a
        href="https://github.com/stephaniechatter/whimsicalweatherapp"
        target="_blank"
        rel="noreferrer"
      >
        open-sourced on GitHub
      </a>{" "}
      and hosted on{" "}
      <a href="https://luminous-babka-e88392.netlify.app/" target="_blank" rel="noreferrer">
        Netlify
      </a>
      .
    </footer>
  );
}

export default App;
