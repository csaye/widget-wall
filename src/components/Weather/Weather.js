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
      setResponse(jsonResponse);
    });
  }

  // returns given date shifted for given timezone
  function getLocalDate(date, timezone) {
    // get utc by factoring in timezone
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    // modify utc by timezone and return
    return new Date(utc + (timezone * 1000));
  }

  // celsius to fahrenheit
  function celsiusToFahrenheit(celsius) {
     let fahrenheit = celsius * (9 / 5) + 32;
     // round to two decimal places
     return Math.round(fahrenheit * 100) / 100;
  }

  // meters per second to miles per hour
  function msToMiHr(ms) {
    let miHr = ms * 2.237;
    // round to two decimal places
    return Math.round(miHr * 100) / 100;
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
            {getLocalDate(new Date(), response.timezone).toDateString()}
            <br />
            {getLocalDate(new Date(), response.timezone).toLocaleTimeString()}
          </p>
          <p><u>Coordinates</u><br />{response.coord.lat}, {response.coord.lon}</p>
          <p><u>Weather</u><br />{response.weather[0].main}</p>
          <img src={`http://openweathermap.org/img/w/${response.weather[0].icon}.png`} alt="" />
          <p><u>Temperature</u><br />{response.main.temp}C, {celsiusToFahrenheit(response.main.temp)}F</p>
          <p><u>Clouds</u><br />{response.clouds.all}%</p>
          <p><u>Humidity</u><br />{response.main.humidity}%</p>
          <p><u>Wind</u><br />
            {response.wind.speed}m/s, {msToMiHr(response.wind.speed)}mi/hr
            <br />
            {response.wind.deg}°
          </p>
          <p><u>Sunrise/Sunset</u><br />
          {getLocalDate(new Date(response.sys.sunrise * 1000), response.timezone).toLocaleTimeString()}
          /
          {getLocalDate(new Date(response.sys.sunset * 1000), response.timezone).toLocaleTimeString()}
          </p>
        </>
      }
    </div>
  );
}

export default Weather;
