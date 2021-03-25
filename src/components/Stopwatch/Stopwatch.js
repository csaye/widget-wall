import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';

import './Stopwatch.css';

function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [deltaMs, setDeltaMs] = useState(0);
  const [deltaTime, setDeltaTime] = useState("00:00:00");

  const uid = firebase.auth().currentUser.uid;
  const stopwatchRef = firebase.firestore().collection('stopwatch').doc(uid);

  function formatTime(ms) {
    let hours = 0;
    let minutes = 0;
    let seconds = Math.floor(ms / 1000);
    if (seconds > 59) {
      minutes = Math.floor(seconds / 60);
      seconds %= 60;
    }
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes %= 60;
    }
    let hh = hours.toString();
    let mm = minutes.toString();
    let ss = seconds.toString();
    // pad with zeroes
    if (hh.length < 2) hh = '0' + hh;
    if (mm.length < 2) mm = '0' + mm;
    if (ss.length < 2) ss = '0' + ss;
    // join with colon
    return [hh, mm, ss].join(':');
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (running) {
        const currentTime = new Date();
        const msDelta = currentTime - startTime;
        setDeltaMs(msDelta);
        const timeDelta = formatTime(msDelta);
        setDeltaTime(timeDelta);
      }
    }, 100);
    return () => clearInterval(timeInterval);
  }, [running, startTime]);

  function getData() {
    stopwatchRef.get().then(doc => {
      if (doc.exists) {
        // get doc data
        const docData = doc.data();
        const msDelta = docData.deltaMs;
        const timeStart = docData.startTime;
        const timeDelta = running ? formatTime(new Date() - timeStart) : formatTime(msDelta);
        // update hooks
        setStartTime(timeStart);
        setRunning(docData.running);
        setDeltaMs(msDelta);
        setDeltaTime(timeDelta);
      }
    });
  }

  useEffect(() => {
    // get data on start
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function stopStopwatch() {
    setRunning(false);
    // update firebase
    stopwatchRef.set({
      running: false,
      startTime: startTime,
      deltaMs: deltaMs
    });
  }

  function startStopwatch() {
    const timeStart = new Date() - deltaMs;
    setStartTime(timeStart);
    setRunning(true);
    // update firebase
    stopwatchRef.set({
      running: true,
      startTime: timeStart,
      deltaMs: deltaMs
    });
  }

  function resetStopwatch() {
    const timeStart = new Date().getTime();
    setDeltaMs(0);
    setStartTime(timeStart);
    setDeltaTime("00:00:00");
    // update firebase
    stopwatchRef.set({
      running: running,
      startTime: timeStart,
      deltaMs: 0
    });
  }

  return (
    <div className="Stopwatch widget">
      <h1>Stopwatch</h1>
      <p>{deltaTime}</p>
      {
        running ?
        <button onClick={stopStopwatch}>Stop Stopwatch</button> :
        <button onClick={startStopwatch}>Start Stopwatch</button>
      }
      <button onClick={resetStopwatch}>Reset Stopwatch</button>
    </div>
  );
}

export default Stopwatch;
