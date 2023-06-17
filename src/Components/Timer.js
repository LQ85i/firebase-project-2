import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [startTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setCurrentTime(elapsed);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [startTime]);

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');


    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  return <div>{formatTime(currentTime)}</div>;
};

export default Timer;