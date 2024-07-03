import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [temperatureC, setTemperatureC] = useState(75); 
  const [temperatureF, setTemperatureF] = useState(0);  
  const [description, setDescription] = useState(faSun);
  const [humidity, setHumidity] = useState(60);
  const [windSpeedKmh, setWindSpeedKmh] = useState(5);   
  const [windSpeedMph, setWindSpeedMph] = useState(0);  
  const [time, setTime] = useState("");

  const [forecast] = useState([
    { day: "Mon", icon: faSun, className: "fa-sun" },
    { day: "Tue", icon: faCloudSun, className: "fa-cloud-sun" },
    { day: "Wed", icon: faCloud, className: "fa-cloud" },
    { day: "Thu", icon: faCloudRain, className: "fa-cloud-rain" },
  ]);

  const weatherIcons = {
    sunny: faSun,
    partlyCloudy: faCloudSun,
    cloudy: faCloud,
    rainy: faCloudRain
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setTemperatureC(Math.floor(Math.random() * 41));
      setTemperatureF(convertCtoF(temperatureC));
      setDescription(weatherIcons.sunny);
      setHumidity(Math.floor(Math.random() * 101));
      setWindSpeedKmh(Math.floor(Math.random() * 21));
      setWindSpeedMph(convertKmhtoMph(windSpeedKmh));
      const currentTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      setTime(currentTime);
    };

    fetchWeatherData();
  }, [temperatureC, windSpeedKmh]);

  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value;
    setCity(cityInput);
    setTemperatureC(Math.floor(Math.random() * 41));
    setTemperatureF(convertCtoF(temperatureC));
    setDescription(weatherIcons.sunny);
    setHumidity(Math.floor(Math.random() * 101));
    setWindSpeedKmh(Math.floor(Math.random() * 21));
    setWindSpeedMph(convertKmhtoMph(windSpeedKmh));
    const currentTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setTime(currentTime);
  };

  const convertCtoF = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  const convertKmhtoMph = (kmh) => {
    return kmh / 1.60934;
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
          <p className="weather-app-image">
            <FontAwesomeIcon icon={description} size="2x" />
          </p>
          <p className="weather-app-details">
            Temperature: <strong>{temperatureC}°C | {temperatureF}°F</strong>, Humidity:{" "}
            <strong>{humidity}%</strong>, Wind: <strong>{windSpeedKmh} km/h | {windSpeedMph.toFixed(2)} mph</strong>,
            Time: <strong>{time}</strong>
          </p>
        </div>
        <div className="forecast-container">
          <h2>4-Day Forecast</h2>
          <div className="forecast-list">
            {forecast.map((item, index) => (
              <div key={index} className="forecast-item">
                <FontAwesomeIcon icon={item.icon} size="2x" className={item.className} />
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
      This project was coded by <a
        href="https://github.com/stephaniechatter"
        target="_blank"
        rel="noreferrer"
      >Stephanie White</a>{" "} and is{" "}
      <a
        href="https://github.com/stephaniechatter/whimsicalweatherapp"
        target="_blank"
        rel="noreferrer"
      >open-sourced on GitHub</a> and hosted on{" "}
      <a
        href="https://luminous-babka-e88392.netlify.app/"
        target="_blank"
        rel="noreferrer"
      >Netlify</a>.
    </footer>
  );
}

export default App;
