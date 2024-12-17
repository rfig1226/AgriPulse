import React, { useState, useEffect } from "react";

function Weather() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    try {
      console.log("fetching weather data");
      const response = await fetch(
        `http://127.0.0.1:5000/fetch_weather?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json(); // Parse JSON response
      console.log("Weather Data:", data);
      setWeatherData(data); // Set the state with the weather data
    } catch (err) {
      setError("Error fetching weather data: " + err.message);
    }
  };

  const handleGetLocation = () => {
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
      <h2>Weather Information</h2>
      <button onClick={handleGetLocation}>Get My Location</button>
      {error ? (
        <p>{error}</p>
      ) : weatherData ? (
        <div>
          <p>Temperature: {weatherData.temperature} °C</p>
          <p>Wind Speed: {weatherData.windspeed} km/h</p>
          <p>Weather Code: {weatherData.weathercode}</p>
        </div>
      ) : (
        <p>Click the button to fetch weather data...</p>
      )}
    </div>
  );
}

export default Weather;
