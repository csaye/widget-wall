import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';

import './ClickCount.css';

let totalClicks = 0;
let bestCps = 0
let cps = 0;

function ClickCount() {
  const [totalDisplay, setTotalDisplay] = useState(0);
  const [cpsDisplay, setCpsDisplay] = useState(0);
  const [bestCpsDisplay, setBestCpsDisplay] = useState(0);

  const uid = firebase.auth().currentUser.uid;
  const clicksRef = firebase.firestore().collection('clicks').doc(uid);

  useEffect(() => {
    // retrieve click data
    clicksRef.get().then(doc => {
      if (doc.exists) {
        const docData = doc.data();
        totalClicks = docData.totalClicks;
        bestCps = docData.bestCps;
        updateDisplay();
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const cpsInterval = setInterval(() => {
      if (cps > 0) {
        if (cps > bestCps) bestCps = cps;
        cps = 0;
        updateDisplay();
      }
    }, 1000);
    return () => clearInterval(cpsInterval);
  }, []);

  function updateDisplay() {
    setTotalDisplay(totalClicks);
    setCpsDisplay(cps);
    setBestCpsDisplay(bestCps);
  }

  async function incrementClick() {
    totalClicks += 1;
    cps += 1;
    updateDisplay();
    // update firebase
    await clicksRef.set({
      totalClicks,
      bestCps
    });
  }

  return (
    <div className="ClickCount widget">
      <h1>Click Count</h1>
      <button onClick={incrementClick}>Click</button>
      <p>{cpsDisplay}</p>
      <p>Total clicks: {totalDisplay}</p>
      <p>Best clicks per second: {bestCpsDisplay}</p>
    </div>
  );
}

export default ClickCount;
