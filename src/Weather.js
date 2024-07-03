import React, { useEffect, useState } from "react";
import axios from "axios";
import sunny from "../src/assets/clearskies.jpg";
import cloudy from "../src/assets/clouds.jpg";
import drizzle from "../src/assets/rain.jpg";
import snow from "../src/assets/snow.png"
import mist from "../src/assets/fog.jpg";

const weatherIcons = {
  Clear: sunny,
  Clouds: cloudy,
  Drizzle: drizzle,
  Snow: snow,
  Mist: mist
};

const iconStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

export default function Weather({ city }) {
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");

  useEffect(() => {
    const apiKey = "ab8e7ef210556986d1c9a75d6007b825";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        setTemperature(response.data.main.temp);
        setDescription(response.data.weather[0].main);
        setHumidity(response.data.main.humidity);
        setWindSpeed(response.data.wind.speed);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  const getWeatherIcon = (weatherDescription) => {
    const iconUrl = weatherIcons[weatherDescription];
    if (iconUrl) {
      return <img src={iconUrl} alt={weatherDescription} style={iconStyle} />;
    } else {
      return <span>❓</span>;
    }
  };

  return (
    <div className="weather-app-data">
      <h1 className="weather-app-city">{city}</h1>
      <p className="weather-app-details">
        <span className="weather-app-icon">{getWeatherIcon(description)}</span>
        <br />
        Temperature: <strong>{temperature}°C</strong>, Humidity:{" "}
        <strong>{humidity}%</strong>, Wind: <strong>{windSpeed} km/h</strong>
      </p>
    </div>
  );
}
