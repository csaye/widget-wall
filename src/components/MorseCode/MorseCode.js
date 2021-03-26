import React, { useState } from 'react';

import { morseCodes } from '../../util/morseCodes.js';

import './MorseCode.css';

function MorseCode() {
  const [inText, setInText] = useState("");
  const [outText, setOutText] = useState(undefined);
  const [action, setAction] = useState("encrypt");

  function convertText(e) {
    e.preventDefault();
    let textOut = "";
    // encrypt
    if (action === "encrypt") {
      for (let i = 0; i < inText.length; i++) {
        let charIndex = inText.charCodeAt(i);
        // lowercase letter
        if (charIndex > 96 && charIndex <= 122) {
          const index = charIndex - 97;
          textOut += morseCodes[index];
        // uppercase letter
        } else if (charIndex > 64 && charIndex <= 90) {
          const index = charIndex - 65;
          textOut += morseCodes[index];
        // number
        } else if (charIndex > 47 && charIndex <= 57) {
          const index = charIndex - 22;
          textOut += morseCodes[index];
        // space
      } else if (inText[i] === " ") {
          textOut += " /";
        // something else
        } else {
          textOut += inText[i];
        }
        if (i !== inText.length - 1) textOut += " ";
      }
    }
    // decrypt
    else {
      // for each word
      const words = inText.split(" / ");
      for (let i = 0; i < words.length; i++) {
        // for each character
        const word = words[i];
        const chars = word.split(" ");
        for (let j = 0; j < chars.length; j++) {
          const char = chars[j];
          let index = morseCodes.indexOf(char);
          // if not morse code character
          if (index === -1) {
            // append char
            textOut += char;
          // if morse code character
          } else {
            // number
            if (index > 25) index += 22;
            // letter
            else index += 65;
            // append character
            textOut += String.fromCharCode(index);
          }
        }
        if (i !== words.length - 1) textOut += " ";
      }
    }
    setOutText(textOut);
  }

  return (
    <div className="MorseCode widget">
      <h1>MorseCode</h1>
      <form onSubmit={convertText}>
        <label htmlFor="morsecode-intext">Text</label>
        <input id="morsecode-intext" value={inText} onChange={e => setInText(e.target.value)} required />
        <label htmlFor="morsecode-action">Action</label>
        <select id="morsecode-action" value={action} onChange={e => setAction(e.target.value)}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
        <button type="submit">Convert</button>
      </form>
    {outText && <p>{outText}</p>}
    </div>
  );
}

export default MorseCode;
