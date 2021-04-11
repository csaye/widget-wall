import React, { useState } from 'react';

import './DistConvert.css';

const kmToM = 1000;
const cmToM = 0.01;
const mmToM = 0.001;
const miToM = 1609.34;
const ydToM = 0.9144;
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
    switch(inUnit) {
      case "km": factor *= kmToM; break;
      case "cm": factor *= cmToM; break;
      case "mm": factor *= mmToM; break;
      case "mi": factor *= miToM; break;
      case "yd": factor *= ydToM; break;
      case "f": factor *= fToM; break;
      case "in": factor *= inToM; break;
      default: break;
    }
    // convert to out unit
    switch (outUnit) {
      case "km": factor *= 1 / kmToM; break;
      case "cm": factor *= 1 / cmToM; break;
      case "mm": factor *= 1 / mmToM; break;
      case "mi": factor *= 1 / miToM; break;
      case "yd": factor *= 1 / ydToM; break;
      case "f": factor *= 1 / fToM; break;
      case "in": factor *= 1 / inToM; break;
      default: break;
    }
    // calculate dist out
    let distOut = distIn * factor;
    if (distOut === 0) setOutDist('0' + outUnit);
    else {
      // round to three decimal places
      distOut = Math.round(distOut * 1000) / 1000;
      if (distOut === 0) setOutDist('<0.001' + outUnit);
      else setOutDist(distOut + outUnit);
    }
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
          <option value="mm">Millimeters</option>
          <option value="mi">Miles</option>
          <option value="yd">Yards</option>
          <option value="f">Feet</option>
          <option value="in">Inches</option>
        </select>
        <label htmlFor="distconvert-outunit">Out Unit</label>
        <select id="distconvert-outunit" value={outUnit} onChange={e => setOutUnit(e.target.value)}>
        <option value="km">Kilometers</option>
        <option value="m">Meters</option>
        <option value="cm">Centimeters</option>
        <option value="mm">Millimeters</option>
        <option value="mi">Miles</option>
        <option value="yd">Yards</option>
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
