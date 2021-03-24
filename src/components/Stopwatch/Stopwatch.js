import React, { useState, useEffect } from 'react';

import './Stopwatch.css';

function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [deltaMs, setDeltaMs] = useState(0);
  const [deltaTime, setDeltaTime] = useState("00:00:00");

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

  function stopStopwatch() {
    setRunning(false);
  }

  function startStopwatch() {
    setStartTime(new Date() - deltaMs);
    setRunning(true);
  }

  function resetStopwatch() {
    setDeltaMs(0);
    setStartTime(new Date());
    setDeltaTime("00:00:00");
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
