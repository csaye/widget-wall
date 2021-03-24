import React, { useState } from 'react';

import './Color.css';

const letters = '0123456789ABCDEF';

function Color() {
  const [color, setColor] = useState(undefined);
  const [copied, setCopied] = useState(false);

  function generateColor() {
    let newColor = '#'
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * 16);
      newColor += letters[index];
    }
    setColor(newColor);
  }

  function copyColor() {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  return (
    <div className="Color widget">
      <h1>Random Color</h1>
      <button onClick={generateColor}>Generate Color</button>
      {
        color &&
        <>
          <div onClick={copyColor} className="color-box" style={{background: color}}></div>
          {copied && <p className="success">Color copied</p>}
          <p><u>{color}</u></p>
          <p>R: {parseInt(color.substring(1, 3), 16)}</p>
          <p>G: {parseInt(color.substring(3, 5), 16)}</p>
          <p>B: {parseInt(color.substring(5, 7), 16)}</p>
        </>
      }
    </div>
  );
}

export default Color;
