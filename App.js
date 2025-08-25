import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const apiKey = '874ee8a22fc3f7e3258c696984701d3d'; // <-- Your key

  const getWeather = async () => {
    if (!city) return alert('Please enter a city name');

    try {
      // Step 1: Geocoding API
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) throw new Error('City not found');

      const { lat, lon } = geoData[0];

      // Step 2: Weather API
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData);
    } catch (error) {
      setWeather({ error: error.message });
    }
  };


  return (
    <div className='App'>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && weather.error && <p>{weather.error}</p>}

      {weather && !weather.error && (
        <div className="weather-result">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
}

export default App;
