import React, { useState } from 'react';

import './DistConvert.css';

function DistConvert() {
  const [inDist, setInDist] = useState("0");
  const [outDist, setOutDist] = useState(undefined);
  const [inUnit, setInUnit] = useState("m");
  const [outUnit, setOutUnit] = useState("f");

  function convertDist(e) {
    e.preventDefault();
    const distIn = parseFloat(inDist);
    let factor = 1;
    // get conversion factor
    if (inUnit == "m" && outUnit == "f") factor = 3.281;
    else if (inUnit == "f" && outUnit == "m") factor = 0.305;
    let distOut = distIn * factor;
    // round to two decimal places
    distOut = Math.round(distOut * 100) / 100;
    setOutDist(distOut + outUnit);
  }

  return (
    <div className="DistConvert widget">
      <h1>Dist Convert</h1>
      <form onSubmit={convertDist}>
        <label htmlFor="distconvert-indist">Distance</label>
        <input id="baseconvert-indist" value={inDist} type="number" onChange={e => setInDist(e.target.value)} required />
        <label htmlFor="distconvert-inunit">In Unit</label>
        <select id="distconvert-inunit" value={inUnit} onChange={e => setInUnit(e.target.value)}>
          <option value="m">Meters</option>
          <option value="f">Feet</option>
        </select>
        <label htmlFor="distconvert-outunit">Out Unit</label>
        <select id="distconvert-outunit" value={outUnit} onChange={e => setOutUnit(e.target.value)}>
        <option value="m">Meters</option>
        <option value="f">Feet</option>
        </select>
        <button type="submit">Convert</button>
      </form>
    {outDist && <p>{outDist}</p>}
    </div>
  );
}

export default DistConvert;
