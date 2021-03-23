import React, { useEffect, useState } from 'react';

import './Time.css';

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const newDate = new Date();
      if (newDate.getSeconds() !== currentTime.getSeconds()) {
        setCurrentTime(newDate);
      }
    }, 100);
    return () => clearInterval(timeInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Time widget">
      <p>{currentTime.toDateString()}</p>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
}

export default Time;
