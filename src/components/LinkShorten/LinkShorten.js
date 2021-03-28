import React, { useState } from 'react';

import { bitlyToken } from '../../util/config/bitlyToken.js';

function LinkShorten() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  async function shortenLink(e) {
    e.preventDefault();

    // bitly request information
    const url = 'https://api-ssl.bitly.com/v4/shorten';
    const options = {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + bitlyToken,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "long_url": longUrl, "domain": "bit.ly" })
    };

    // request from bitly
    return await fetch(url, options).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      console.log(jsonResponse);
      setShortUrl(jsonResponse.link);
    });
  }

  return (
    <div className="LinkShorten widget">
      <h1>Link Shorten</h1>
      <form onSubmit={shortenLink}>
        <label htmlFor="linkshorten-longurl">Long URL</label>
        <input
          id="linkshorten-longurl"
          placeholder="https://example.com"
          type="url"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten Link</button>
      </form>
      {
        shortUrl &&
        <a href={shortUrl} target="_blank" rel="noreferrer"><p>{shortUrl}</p></a>
      }
    </div>
  );
}

export default LinkShorten;
