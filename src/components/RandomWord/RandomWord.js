import React, { useState } from 'react';

import './RandomWord.css';

function RandomWord() {
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState(undefined);

  async function getRandomWord() {
    const url = `https://random-word-api.herokuapp.com/word`;
    // request from random-word-api
    await fetch(url).then(response => {
      if (response.ok) return response.json();
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      setWord(jsonResponse);
      // request from datamuse
      const dUrl = `https://api.datamuse.com/words?sp=${jsonResponse}&md=d&max=1`;
      fetch(dUrl).then(dResponse => {
        if (dResponse.ok) return dResponse.json();
        throw new Error('Search request failed!');
      }, networkError => console.log(networkError.message))
      .then(dJsonResponse => {
        // get definitions
        let defs = dJsonResponse[0]?.defs;
        if (defs) {
          // maximum 3 defs
          if (defs.length > 3) defs = defs.slice(0, 3);
          // put word type in parentheses
          defs = defs.map(def => {
            const defWords = def.split('	');
            return `(${defWords[0]}) ${defWords.slice(1).join(' ')}`;
          });
        }
        setDefinitions(defs);
      });
    });
  }

  return (
    <div className="RandomWord widget">
      <h1>Random Word</h1>
      <button onClick={getRandomWord}>Get Random Word</button>
      {word && <p className="word-text">{word}</p>}
      {
        definitions &&
        definitions.map((d, i) => <p key={`randomword-def${i}`}><i>{d}</i></p>)
      }
    </div>
  );
}

export default RandomWord;
