import React, { useState } from 'react';

import './PrimeCheck.css';

function PrimeCheck() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(undefined);

  function checkPrime(e) {
    e.preventDefault();
    const num = parseInt(number);
    // return if invalid int
    if (isNaN(num)) return;
    const upper = Math.floor(Math.sqrt(num));
    let prime = true;
    for (let i = 2; i < upper + 1; i++) {
      // if constant, set prime and break
      if (num % i === 0) {
        prime = false;
        break;
      }
    }
    // set result
    const res = num + (prime ? " is prime" : " is not prime");
    setResult(res);
  }

  return (
    <div className="PrimeCheck widget">
      <h1>Prime Check</h1>
      <form onSubmit={checkPrime}>
        <input value={number} type="number" min="2" onChange={e => setNumber(e.target.value)} required />
        <button type="submit">Check</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default PrimeCheck;
