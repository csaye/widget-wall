import React, { useState } from 'react';

import './DiceRoll.css';

function DiceRoll() {
  const [roll, setRoll] = useState(undefined);
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("6");
  const [intMin, setIntMin] = useState(1);
  const [intMax, setIntMax] = useState(6);

  function trySetMin(value) {
    const int = parseInt(value);
    if (!isNaN(int)) setIntMin(int);
    setMin(value);
  }

  function trySetMax(value) {
    const int = parseInt(value);
    if (!isNaN(int)) setIntMax(int);
    setMax(value);
  }

  function rollDice(e) {
    e.preventDefault();
    const random = Math.floor(Math.random() * ((intMax + 1) - intMin)) + intMin;
    setRoll(random);
  }

  return (
    <div className="DiceRoll widget">
      <h1>Dice Roll</h1>
      <form onSubmit={rollDice}>
        <label htmlFor="diceroll-min">Min (inclusive)</label>
        <input id="diceroll-min" value={min} max={intMax} type="number" onChange={e => trySetMin(e.target.value)} required />
        <label htmlFor="diceroll-max">Max (inclusive)</label>
        <input id="diceroll-max" value={max} min={intMin} type="number" onChange={e => trySetMax(e.target.value)} required />
        <button type="submit">Roll Dice</button>
      </form>
      {
        roll !== undefined &&
        <p>{roll}</p>
      }
    </div>
  );
}

export default DiceRoll;
