import React, { useState } from 'react';

import './RockPaperScissors.css';

function RockPaperScissors() {
  const [handIn, setHandIn] = useState("Rock");
  const [handOut, setHandOut] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [resColor, setResColor] = useState(undefined);

  function playHand(e) {
    e.preventDefault();
    // get random out hand
    const rand = Math.floor(Math.random() * 3);
    let outHand;
    if (rand === 0) outHand = "Rock";
    else if (rand === 1) outHand = "Paper";
    else outHand = "Scissors";
    // decide result and color
    let res;
    let color;
    if (handIn === outHand) res = "Draw";
    else if (handIn === "Rock") res = outHand === "Scissors" ? "Win" : "Lose";
    else if (handIn === "Paper") res = outHand === "Rock" ? "Win" : "Lose";
    else res = outHand === "Paper" ? "Win" : "Lose";
    if (res === "Draw") color = "#555";
    else if (res === "Win") color = "green";
    else color = "red";
    // set hand out and result
    setHandOut(outHand);
    setResColor(color);
    setResult(res);
  }

  return (
    <div className="RockPaperScissors widget">
      <h1>Rock Paper<br />Scissors</h1>
      <form onSubmit={playHand}>
        <select value={handIn} onChange={e => setHandIn(e.target.value)} required>
          <option value="Rock">Rock</option>
          <option value="Paper">Paper</option>
          <option value="Scissors">Scissors</option>
        </select>
        <button onClick="submit">Play</button>
      </form>
      {handOut && <p>{handOut}</p>}
      {result && <p style={{color: resColor}}>{result}</p>}
    </div>
  );
}

export default RockPaperScissors;
