import React, { useState } from 'react';

import { openWeatherKey } from '../../util/config/openWeatherKey.js';

import './Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [response, setResponse] = useState(undefined);

  async function getWeather(e) {
    e.preventDefault();

    // request from openweather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}`;
    return await fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      setResponse(jsonResponse);
    });
  }

  return (
    <div className="Weather widget">
      <h1>Weather</h1>
      <form onSubmit={getWeather}>
        <input value={city} onChange={e => setCity(e.target.value)} required />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}

export default Weather;
