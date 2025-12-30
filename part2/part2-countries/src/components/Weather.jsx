import { useState, useEffect } from "react";
import weatherService from "../services/weatherServices";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((err) => {
        setError("Could not fetch weather data");
        setWeather(null);
      });
  }, [capital]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
