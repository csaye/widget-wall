import React, { useState } from 'react';

import { openWeatherKey } from '../../util/config/openWeatherKey.js';

import './SunriseSunset.css';

function SunriseSunset() {
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

  return (
    <div className="SunriseSunset widget">
      <h1>Sunrise/Sunset</h1>
      <form onSubmit={getWeather}>
        <label htmlFor="sunrisesunset-city">City</label>
        <input
          id="sunrisesunset-city"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Sunrise/Sunset</button>
      </form>
      {
        response &&
        <>
          <p><u>Local Time</u><br />
            {getLocalDate(new Date(), response.timezone).toDateString()}
            <br />
            {getLocalDate(new Date(), response.timezone).toLocaleTimeString()}
          </p>
          <p><u>Sunrise/Sunset</u><br />
          {getLocalDate(new Date(response.sys.sunrise * 1000), response.timezone).toLocaleTimeString()}
          /
          {getLocalDate(new Date(response.sys.sunset * 1000), response.timezone).toLocaleTimeString()}
          </p>
          <img src='http://openweathermap.org/img/w/01d.png' alt="" />
          <img src='http://openweathermap.org/img/w/01n.png' alt="" />
        </>
      }
    </div>
  );
}

export default SunriseSunset;
