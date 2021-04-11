import React, { useState } from 'react';

import './CoinFlip.css';

function CoinFlip() {
  const [result, setResult] = useState(undefined);

  function flipCoin() {
    setResult('...');
    setTimeout(() => {
      const random = Math.random() > 0.5;
      setResult(random ? 'Heads' : 'Tails');
    }, 150);
  }

  return (
    <div className="CoinFlip widget">
      <h1>Coin Flip</h1>
      <button onClick={flipCoin}>Flip Coin</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default CoinFlip;
