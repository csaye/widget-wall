import React, { useState } from 'react';

import './TempConvert.css';

function TempConvert() {
  const [inTemp, setInTemp] = useState("0");
  const [outTemp, setOutTemp] = useState(undefined);
  const [inUnit, setInUnit] = useState("C");
  const [outUnit, setOutUnit] = useState("F");

  function convertTemp(e) {
    e.preventDefault();
    const intIn = parseInt(inTemp);
    if (inUnit === outUnit) setOutTemp(intIn.toString() + outUnit);
    else if (outUnit === "F") {
      const rawOut = intIn * 9 / 5 + 32;
      const intOut = Math.round(rawOut * 100) / 100;
      setOutTemp(intOut.toString() + outUnit);
    }
    else {
      const rawOut = (intIn - 32) * 5 / 9;
      const intOut = Math.round(rawOut * 100) / 100;
      setOutTemp(intOut.toString() + outUnit);
    }
  }

  return (
    <div className="TempConvert widget">
      <form onSubmit={convertTemp}>
        <label htmlFor="tempconvert-intemp">Temperature</label>
        <input id="baseconvert-intemp" value={inTemp} type="number" onChange={e => setInTemp(e.target.value)} required />
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
