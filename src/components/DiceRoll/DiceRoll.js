import React, { useState } from 'react';

import './DiceRoll.css';

function DiceRoll() {
  const [roll, setRoll] = useState(undefined);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(6);

  function rollDice(e) {
    e.preventDefault();
    const random = Math.floor(Math.random() * ((max + 1) - min)) + min;
    setRoll(random);
  }

  return (
    <div className="DiceRoll widget">
      <form onSubmit={rollDice}>
        <label htmlFor="diceroll-min">Min (inclusive)</label>
        <input id="diceroll-min" value={min} min="0" max={max} type="number" onChange={e => setMin(e.target.valueAsNumber)} />
        <label htmlFor="diceroll-max">Max (inclusive)</label>
        <input id="diceroll-max" value={max} min={min} type="number" onChange={e => setMax(e.target.valueAsNumber)} />
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
