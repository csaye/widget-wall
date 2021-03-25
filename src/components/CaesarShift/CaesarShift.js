import React, { useState } from 'react';

import './CaesarShift.css';

function CaesarShift() {
  const [inText, setInText] = useState("");
  const [outText, setOutText] = useState(undefined);
  const [shift, setShift] = useState(0);

  function shiftText(e) {
    e.preventDefault();
    let intShift = parseInt(shift);
    intShift %= 26;
    let textOut = "";
    for (let i = 0; i < inText.length; i++) {
      let charIndex = inText.charCodeAt(i);
      // lowercase letter
      if (charIndex > 96 && charIndex <= 122) {
        charIndex += intShift;
        if (charIndex > 122) charIndex -= 26;
        else if (charIndex <= 96) charIndex += 26;
      // uppercase letter
    } else if (charIndex > 64 && charIndex <= 90) {
        charIndex += intShift;
        if (charIndex > 90) charIndex -= 26;
        else if (charIndex <= 64) charIndex += 26;
      }
      textOut += String.fromCharCode(charIndex);
    }
    setOutText(textOut);
  }

  return (
    <div className="CaesarShift widget">
      <h1>Caesar Shift</h1>
      <form onSubmit={shiftText}>
        <label htmlFor="caesarshift-intext">In Text</label>
        <input id="caesarshift-intext" value={inText} onChange={e => setInText(e.target.value)} required />
        <label htmlFor="baseconvert-shift">Shift</label>
        <input id="baseconvert-shift" type="number" min="-26" max="26" value={shift} onChange={e => setShift(e.target.value)} required />
        <button type="submit">Shift Text</button>
      </form>
      {outText && <p>{outText}</p>}
    </div>
  );
}

export default CaesarShift;
