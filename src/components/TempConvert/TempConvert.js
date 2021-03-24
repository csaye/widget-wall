import React, { useState } from 'react';

import './TempConvert.css';

function TempConvert() {
  const [inTemp, setInTemp] = useState("0");
  const [outTemp, setOutTemp] = useState(undefined);
  const [inUnit, setInUnit] = useState("C");
  const [outUnit, setOutUnit] = useState("F");

  function convertTemp(e) {
    e.preventDefault();
    const tempIn = parseFloat(inTemp);
    // if same unit
    if (inUnit === outUnit) setOutTemp(tempIn + outUnit);
    // celsius to fahrenheit
    else if (outUnit === "F") {
      const rawTempOut = tempIn * 9 / 5 + 32;
      const tempOut = Math.round(rawTempOut * 100) / 100;
      setOutTemp(tempOut + outUnit);
    // fahrenheit to celsius
    } else {
      const rawTempOut = (tempIn - 32) * 5 / 9;
      const tempOut = Math.round(rawTempOut * 100) / 100;
      setOutTemp(tempOut + outUnit);
    }
  }

  return (
    <div className="TempConvert widget">
      <h1>Temp Convert</h1>
      <form onSubmit={convertTemp}>
        <label htmlFor="tempconvert-intemp">Temperature</label>
        <input id="baseconvert-intemp" value={inTemp} type="number" step="any" onChange={e => setInTemp(e.target.value)} required />
        <label htmlFor="tempconvert-inunit">In Unit</label>
        <select id="tempconvert-inunit" value={inUnit} onChange={e => setInUnit(e.target.value)}>
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
        </select>
        <label htmlFor="tempconvert-outunit">Out Unit</label>
        <select id="tempconvert-outunit" value={outUnit} onChange={e => setOutUnit(e.target.value)}>
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
        </select>
        <button type="submit">Convert</button>
      </form>
    {outTemp && <p>{outTemp}</p>}
    </div>
  );
}

export default TempConvert;
