import React, { useState } from 'react';

import './CoinFlip.css';

function CoinFlip() {
  const [heads, setHeads] = useState(undefined);

  function flipCoin() {
    const random = Math.random() > 0.5;
    setHeads(random);
  }

  return (
    <div className="CoinFlip widget">
      <button onClick={flipCoin}>Flip Coin</button>
      {
        heads !== undefined &&
        <p>{heads ? 'Heads' : 'Tails'}</p>
      }
    </div>
  );
}

export default CoinFlip;
