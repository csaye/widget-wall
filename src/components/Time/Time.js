import React, { useEffect, useState } from 'react';

import './Time.css';

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let lastTime = new Date();

    const timeInterval = setInterval(() => {
      const newDate = new Date();
      if (newDate.getSeconds() !== lastTime.getSeconds()) {
        lastTime = newDate;
        setCurrentTime(newDate);
      }
    }, 100);
    return () => clearInterval(timeInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Time widget">
      <h1>Time and Date</h1>
      <p>{currentTime.toDateString()}</p>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
}

export default Time;
