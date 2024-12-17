import React, { useState, useEffect } from "react";
import { useLocation } from "../locationContext.js";
import "../App.css";

function Weather() {
  const { location, setLocation } = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (lat, lon) => {
    try {
      console.log("fetching weather data...");
      const response = await fetch(
        `https://agripulse-backend.onrender.com/fetch_weather?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json(); // Parse JSON response
      console.log("Weather Data:", data);
      setWeatherData(data); // Set the state with the weather data
    } catch (err) {
      setError("Error fetching weather data: " + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const truncateNumber = (num) => {
    if (typeof num !== "number") return num;
    return parseFloat(num.toPrecision(3));
  };

  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeatherData(latitude, longitude);
        },
        (err) => setError("Error fetching location: " + err.message)
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <div className="header">Local Weather Information</div>
      <button onClick={handleGetLocation}>Get My Location</button>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Fetching weather data...</p>
      ) : weatherData ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Temperature (°F)</th>
              <th>Humidity (%)</th>
              <th>Precipitation (inch)</th>
              <th>Rain (inch)</th>
              <th>Showers (inch)</th>
              <th>Snowfall (inch)</th>
              <th>Wind Speed (mph)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{truncateNumber(weatherData.current_temperature_2m)}</td>
              <td>
                {truncateNumber(weatherData.current_relative_humidity_2m)}
              </td>
              <td>{truncateNumber(weatherData.current_precipitation)}</td>
              <td>{truncateNumber(weatherData.current_rain)}</td>
              <td>{truncateNumber(weatherData.current_showers)}</td>
              <td>{truncateNumber(weatherData.current_snowfall)}</td>
              <td>{truncateNumber(weatherData.current_wind_speed_10m)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>
          Click the button to fetch local weather data at your crop's location
          to use for specialized insights and recommendations!
        </p>
      )}
    </div>
  );
}

export default Weather;
