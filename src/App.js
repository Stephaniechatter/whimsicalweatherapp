import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment-timezone';
import "./App.css";

const API_KEY = "cb286bad3607984b41ed10c8de5cf00e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const FORECAST_URL = `${BASE_URL}/forecast`;

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
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      // Fetch current weather data
      const currentWeatherResponse = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const currentWeatherData = currentWeatherResponse.data;

      setTemperatureC(currentWeatherData.main.temp);
      setTemperatureF(convertCtoF(currentWeatherData.main.temp));
      setDescription(currentWeatherData.weather[0].description);
      setHumidity(currentWeatherData.main.humidity);
      setWindSpeedKmh(currentWeatherData.wind.speed);
      setWindSpeedMph(convertKmhtoMph(currentWeatherData.wind.speed));
      setTime(getCurrentTime());

      // Fetch 4-day forecast data
      const forecastResponse = await axios.get(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const forecastData = forecastResponse.data.list;

      // Process forecast data
      const formattedForecast = forecastData.slice(0, 4).map(item => ({
        day: moment(item.dt_txt).format('ddd'),
        temperatureC: item.main.temp,
        temperatureF: convertCtoF(item.main.temp),
        icon: getWeatherIcon(item.weather[0].main),
        className: getWeatherIconClassName(item.weather[0].main)
      }));

      setForecast(formattedForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const getCurrentTime = () => {
    return moment().format('h:mm A');
  };

  const convertCtoF = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  const convertKmhtoMph = (kmh) => {
    return kmh / 1.60934;
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return faSun;
      case 'Clouds':
        return faCloud;
      case 'Rain':
        return faCloudRain;
      default:
        return faCloudSun;
    }
  };

  const getWeatherIconClassName = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return 'fa-sun';
      case 'Clouds':
        return 'fa-cloud';
      case 'Rain':
        return 'fa-cloud-rain';
      default:
        return 'fa-cloud-sun';
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value;
    setCity(cityInput);
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
          <button type="submit" className="search-form-button">Search</button>
        </form>
      </header>
      <main>
        <div className="weather-app-data">
          <h1 className="default-city-name">{city}</h1>
          <p className="weather-app-image">
            <FontAwesomeIcon icon={getWeatherIcon(description)} size="2x" className={getWeatherIconClassName(description)} />
          </p>
          <p className="weather-app-details">
            Temperature: <strong>{temperatureC.toFixed(2)}°C | {temperatureF.toFixed(2)}°F</strong>, Humidity:{" "}
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
                <p>{item.day}: <strong>{item.temperatureC.toFixed(2)}°C | {item.temperatureF.toFixed(2)}°F</strong></p>
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
