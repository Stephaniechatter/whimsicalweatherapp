import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

const API_KEY = "cb286bad3607984b41ed10c8de5cf00e"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("New York");
  const [temperatureC, setTemperatureC] = useState(0);
  const [temperatureF, setTemperatureF] = useState(0);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [windSpeedKmh, setWindSpeedKmh] = useState(0);
  const [windSpeedMph, setWindSpeedMph] = useState(0);
  const [time, setTime] = useState("");
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('Weather data not available for that city.');
        }
        const data = await response.json();
        console.log(data); // Log the fetched data to debug

        setTemperatureC(data.main.temp);
        setTemperatureF(convertCtoF(data.main.temp));
        setDescription(data.weather[0].description);
        setHumidity(data.main.humidity);
        setWindSpeedKmh(data.wind.speed);
        setWindSpeedMph(convertKmhtoMph(data.wind.speed));
        const currentTime = new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        setTime(currentTime);

        // Example forecast data (you can update this based on your requirements)
        setForecast([
          { day: "Mon", icon: faSun, className: "fa-sun" },
          { day: "Tue", icon: faCloudSun, className: "fa-cloud-sun" },
          { day: "Wed", icon: faCloud, className: "fa-cloud" },
          { day: "Thu", icon: faCloudRain, className: "fa-cloud-rain" },
        ]);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
        // Optionally handle error state or display an error message in your UI
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value;
    setCity(cityInput);
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
            <FontAwesomeIcon icon={description === "Clear" ? faSun : description === "Clouds" ? faCloud : faCloudRain} size="2x" className="weather-icon" />
          </p>
          <p className="weather-app-details">
            Temperature: <strong>{temperatureC}°C | {temperatureF.toFixed(2)}°F</strong>, Humidity:{" "}
            <strong>{humidity}%</strong>, Wind: <strong>{windSpeedKmh.toFixed(2)} km/h | {windSpeedMph.toFixed(2)} mph</strong>,
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
