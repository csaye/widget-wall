import React, { useState } from 'react';

import './BaseConvert.css';

function BaseConvert() {
  const [inNum, setInNum] = useState("0");
  const [outNum, setOutNum] = useState(undefined);
  const [inBase, setInBase] = useState("10");
  const [outBase, setOutBase] = useState("10");

  function convertBase(e) {
    e.preventDefault();
    // get num in in base
    const numIn = parseInt(inNum, inBase);
    // convert num to out base
    const numOut = numIn.toString(outBase).toUpperCase();
    setOutNum(numOut);
  }

  return (
    <div className="BaseConvert widget">
      <h1>Base Convert</h1>
      <form onSubmit={convertBase}>
        <label htmlFor="baseconvert-innum">Number</label>
        <input id="baseconvert-innum" value={inNum} pattern="[A-Za-z0-9]+" onChange={e => setInNum(e.target.value)} required />
        <label htmlFor="baseconvert-inbase">In Base</label>
        <input id="baseconvert-inbase" value={inBase} min="2" max="36" type="number" onChange={e => setInBase(e.target.value)} required />
        <label htmlFor="baseconvert-outbase">Out Base</label>
        <input id="baseconvert-outbase" value={outBase} min="2" max="36" type="number" onChange={e => setOutBase(e.target.value)} required />
        <button type="submit">Convert</button>
      </form>
      {outNum && <p>{outNum}</p>}
    </div>
  );
}

export default BaseConvert;
