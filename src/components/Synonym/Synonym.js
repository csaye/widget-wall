import React, { useState } from 'react';

import './Synonym.css';

function Synonym() {
  const [word, setWord] = useState('');
  const [response, setResponse] = useState(undefined);

  async function getSynonyms(e) {
    e.preventDefault();
    // request from datamuse
    const url = `https://api.datamuse.com/words?rel_syn=${word}&max=10`;
    return await fetch(url).then(response => {
      if (response.ok) return response.json();
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      setResponse(jsonResponse);
    });
  }

  return (
    <div className="Synonym widget">
      <h1>Synonym</h1>
       <form onSubmit={getSynonyms}>
          <input value={word} onChange={e => setWord(e.target.value)} required />
          <button type="submit">Get Synonyms</button>
       </form>
       {response && <p>{response.map(r => r.word).join(', ')}</p>}
    </div>
  );
}

export default Synonym;
