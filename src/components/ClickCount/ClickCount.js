import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';

import './ClickCount.css';

let totalClicks = 0;

function ClickCount() {
  const [totalDisplay, setTotalDisplay] = useState(0);

  const uid = firebase.auth().currentUser.uid;
  const clicksRef = firebase.firestore().collection('clicks').doc(uid);

  useEffect(() => {
    // retrieve click data
    clicksRef.get().then(doc => {
      if (doc.exists) {
        const docData = doc.data();
        totalClicks = docData.totalClicks;
        updateDisplay();
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function updateDisplay() {
    setTotalDisplay(totalClicks);
  }

  function incrementClick() {
    totalClicks += 1;
    updateDisplay();
    // update firebase
    clicksRef.set({
      totalClicks
    });
  }

  return (
    <div className="ClickCount widget">
      <h1>Click Count</h1>
      <button onClick={incrementClick}>Click</button>
      <p>Total clicks: {totalDisplay}</p>
    </div>
  );
}

export default ClickCount;
