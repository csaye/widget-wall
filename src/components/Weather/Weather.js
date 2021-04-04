import React, { useState } from 'react';

import { openWeatherKey } from '../../util/config/openWeatherKey.js';

import './Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [response, setResponse] = useState(undefined);

  async function getWeather(e) {
    e.preventDefault();

    // request from openweather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}&units=metric`;
    return await fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      console.log(jsonResponse);
      setResponse(jsonResponse);
      // console.log(new Date(jsonResponse.dt*1000+(jsonResponse.timezone*1000))); // plus
    });
  }

  function getLocalDate(timezone) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (timezone * 1000));
  }

  return (
    <div className="Weather widget">
      <h1>Weather</h1>
      <form onSubmit={getWeather}>
        <label htmlFor="weather-city">City</label>
        <input
          id="weather-city"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {
        response &&
        <>
          <p><u>Local Time</u><br />
          {getLocalDate(response.timezone).toDateString()}
          <br />
          {getLocalDate(response.timezone).toLocaleTimeString()}
          </p>
          <p><u>Coordinates</u><br />{response.coord.lat}, {response.coord.lon}</p>
          <p><u>Weather</u><br />{response.weather[0].main}</p>
          <img src={`http://openweathermap.org/img/w/${response.weather[0].icon}.png`} alt="" />
          <p><u>Temperature</u><br />{response.main.temp}C, {response.main.temp * (9 / 5) + 32}F</p>
        </>
      }
    </div>
  );
}

export default Weather;
