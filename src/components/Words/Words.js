import React, { useState } from 'react';

import './Words.css';

function Words() {
  const [word, setWord] = useState('');
  const [request, setRequest] = useState('rhy');
  const [response, setResponse] = useState(undefined);

  async function getWords(e) {
    e.preventDefault();
    // request from datamuse
    const url = `https://api.datamuse.com/words?rel_${request}=${word}&max=10`;
    return await fetch(url).then(response => {
      if (response.ok) return response.json();
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      setResponse(jsonResponse);
    });
  }

  return (
    <div className="Words widget">
      <h1>Words</h1>
       <form onSubmit={getWords}>
          <label htmlFor="words-word">Word</label>
          <input
            id="words-word"
            value={word}
            onChange={e => setWord(e.target.value)}
            required
          />
          <label htmlFor="words-request">Request</label>
          <select
            id="words-request"
            value={request}
            onChange={e => setRequest(e.target.value)}
            required
          >
            <option value="rhy">Rhymes</option>
            <option value="trg">Triggers</option>
            <option value="syn">Synonyms</option>
            <option value="ant">Antonyms</option>
            <option value="hom">Homophones</option>
            <option value="cns">Similar Consonants</option>
          </select>
          <button type="submit">Get Words</button>
       </form>
       {response && <p>{response.map(r => r.word).join(', ')}</p>}
    </div>
  );
}

export default Words;
