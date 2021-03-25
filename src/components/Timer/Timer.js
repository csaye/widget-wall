import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';

import './Timer.css';

let h = 0;
let m = 0;
let s = 0;

function Timer() {
  const [running, setRunning] = useState(false);

  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const [display, setDisplay] = useState("00:00:00");

  const uid = firebase.auth().currentUser.uid;
  const timerRef = firebase.firestore().collection('timer').doc(uid);

  // updates display
  function updateDisplay() {
    // convert times to strings
    let hh = h.toString();
    let mm = m.toString();
    let ss = s.toString();
    if (hh.length < 2) hh = "0" + hh;
    if (mm.length < 2) mm = "0" + mm;
    if (ss.length < 2) ss = "0" + ss;
    // join with colon
    const hhmmss = [hh, mm, ss].join(':');
    setDisplay(hhmmss);
  }

  // decrements current time by one second
  function decrementTime() {
    if (s > 0) s -= 1;
    else if (m > 0) {
      m -= 1;
      s = 59;
    } else if (h > 0) {
      h -= 1;
      m = 59;
      s = 59;
    }
    updateDisplay();
  }

  useEffect(() => {
    let lastTime = new Date();
    const timeInterval = setInterval(() => {
      if (running) {
        const newDate = new Date();
        if (newDate.getSeconds() !== lastTime.getSeconds()) {
          lastTime = newDate;
          decrementTime();
        }
      }
    }, 100);
    return () => clearInterval(timeInterval);
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps

  function getTime() {
    timerRef.get().then(doc => {
      if (doc.exists) {
        const docData = doc.data();
        h = docData.hours;
        m = docData.minutes;
        s = docData.seconds;
        // if running, calculate delta
        if (docData.running) {
          // subtract seconds delta
          let secondsDelta = Math.floor((new Date() - docData.startTime) / 1000);
          let totalSeconds = (h * 3600) + (m * 60) + s;
          totalSeconds -= secondsDelta;
          // clamp above zero
          if (totalSeconds < 0) {
            h = 0;
            m = 0;
            s = 0;
          } else {
            h = Math.floor(totalSeconds / 3600);
            m = Math.floor((totalSeconds % 3600) / 60);
            s = Math.floor(totalSeconds % 60);
          }
          // start running
          setRunning(true);
        }
        updateDisplay();
      }
    });
  }

  useEffect(() => {
    // get time on start
    getTime();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setTimer(e) {
    e.preventDefault();
    h = parseInt(hours);
    m = parseInt(minutes);
    s = parseInt(seconds);
    updateDisplay();
    // update firebase
    const startTime = new Date().getTime();
    timerRef.set({
      startTime: startTime,
      running: running,
      hours: h,
      minutes: m,
      seconds: s
    });
  }

  function stopTimer() {
    setRunning(false);
    // update firebase
    const startTime = new Date().getTime();
    timerRef.set({
      startTime: startTime,
      running: false,
      hours: h,
      minutes: m,
      seconds: s
    });
  }

  function startTimer() {
    setRunning(true);
    // update firebase
    const startTime = new Date().getTime();
    timerRef.set({
      startTime: startTime,
      running: true,
      hours: h,
      minutes: m,
      seconds: s
    });
  }

  return (
    <div className="Timer widget">
      <h1>Timer</h1>
      <form onSubmit={setTimer}>
        <input value={hours} type="number" min="0" onChange={e => setHours(e.target.value)} required />
        :
        <input value={minutes} type="number" min="0" max="59" onChange={e => setMinutes(e.target.value)} required />
        :
        <input value={seconds} type="number" min="0" max="59" onChange={e => setSeconds(e.target.value)} required />
        <br />
        <button type="submit">Set Timer</button>
      </form>
      <p>{display}</p>
      {
        running ?
        <button onClick={stopTimer}>Stop Timer</button> :
        <button onClick={startTimer}>Start Timer</button>
      }
    </div>
  );
}

export default Timer;
