import React, { useState } from 'react';

import './Rhyme.css';

function Rhyme() {
  const [word, setWord] = useState('');
  const [response, setResponse] = useState(undefined);

  async function getRhymes(e) {
    e.preventDefault();
    // request from datamuse
    const url = `https://api.datamuse.com/words?rel_rhy=${word}&max=10`;
    return await fetch(url).then(response => {
      if (response.ok) return response.json();
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      setResponse(jsonResponse);
    });
  }

  return (
    <div className="Rhyme widget">
      <h1>Rhyme</h1>
       <form onSubmit={getRhymes}>
          <input value={word} onChange={e => setWord(e.target.value)} required />
          <button type="submit">Get Rhymes</button>
       </form>
       {response && <p>{response.map(r => r.word).join(', ')}</p>}
    </div>
  );
}

export default Rhyme;
