import React, { useState } from 'react';

import './Dictionary.css';

function Dictionary() {
  const [word, setWord] = useState('');
  const [lastWord, setLastWord] = useState('');
  const [definitions, setDefinitions] = useState(undefined);

  async function getDefinition(e) {
    e.preventDefault();
    // request from datamuse
    setLastWord(word);
    setDefinitions(['...']);
    const url = `https://api.datamuse.com/words?sp=${word}&md=d&max=1`;
    fetch(url).then(response => {
      if (response.ok) return response.json();
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      // get definitions
      let defs = jsonResponse[0]?.defs;
      if (defs) {
        // maximum 3 defs
        if (defs.length > 3) defs = defs.slice(0, 3);
        // put word type in parentheses
        defs = defs.map(def => {
          const defWords = def.split('	');
          return `(${defWords[0]}) ${defWords.slice(1).join(' ')}`;
        });
        setDefinitions(defs);
      } else {
        setDefinitions(['No definitions found.']);
      }
    });
  }

  return (
    <div className="Dictionary widget">
      <h1>Dictionary</h1>
      <form onSubmit={getDefinition}>
        <label htmlFor="dictionary-word">Word</label>
        <input
          id="dictionary-word"
          value={word}
          onChange={e => setWord(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {lastWord && <p className="word-text">{lastWord}</p>}
      {
        definitions &&
        definitions.map((d, i) => <p key={`dictionary-def${i}`}><i>{d}</i></p>)
      }
    </div>
  );
}

export default Dictionary;
