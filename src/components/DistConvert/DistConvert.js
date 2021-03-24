import React, { useState } from 'react';

import './DistConvert.css';

const kmToM = 1000;
const cmToM = 0.01;
const miToM = 1609.34;
const fToM = 0.3048;
const inToM = 0.0254;

function DistConvert() {
  const [inDist, setInDist] = useState("0");
  const [outDist, setOutDist] = useState(undefined);
  const [inUnit, setInUnit] = useState("m");
  const [outUnit, setOutUnit] = useState("f");

  function convertDist(e) {
    e.preventDefault();
    const distIn = parseFloat(inDist);
    let factor = 1;
    // convert to meters
    if (inUnit === "km") factor *= kmToM;
    else if (inUnit === "cm") factor *= cmToM;
    else if (inUnit === "mi") factor *= miToM;
    else if (inUnit === "f") factor *= fToM;
    else if (inUnit === "in") factor *= inToM;
    // convert to out unit
    if (outUnit === "km") factor *= (1 / kmToM);
    else if (outUnit === "cm") factor *= (1 / cmToM);
    else if (outUnit === "mi") factor *= (1 / miToM);
    else if (outUnit === "f") factor *= (1 / fToM);
    else if (outUnit === "in") factor *= (1 / inToM);
    let distOut = distIn * factor;
    // round to three decimal places
    distOut = Math.round(distOut * 1000) / 1000;
    setOutDist(distOut + outUnit);
  }

  return (
    <div className="DistConvert widget">
      <h1>Dist Convert</h1>
      <form onSubmit={convertDist}>
        <label htmlFor="distconvert-indist">Distance</label>
        <input id="baseconvert-indist" value={inDist} type="number" step="any" onChange={e => setInDist(e.target.value)} required />
        <label htmlFor="distconvert-inunit">In Unit</label>
        <select id="distconvert-inunit" value={inUnit} onChange={e => setInUnit(e.target.value)}>
          <option value="km">Kilometers</option>
          <option value="m">Meters</option>
          <option value="cm">Centimeters</option>
          <option value="mi">Miles</option>
          <option value="f">Feet</option>
          <option value="in">Inches</option>
        </select>
        <label htmlFor="distconvert-outunit">Out Unit</label>
        <select id="distconvert-outunit" value={outUnit} onChange={e => setOutUnit(e.target.value)}>
        <option value="km">Kilometers</option>
        <option value="m">Meters</option>
        <option value="cm">Centimeters</option>
        <option value="mi">Miles</option>
        <option value="f">Feet</option>
        <option value="in">Inches</option>
        </select>
        <button type="submit">Convert</button>
      </form>
    {outDist && <p>{outDist}</p>}
    </div>
  );
}

export default DistConvert;
