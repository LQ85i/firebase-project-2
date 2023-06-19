import React, { useState, useEffect } from 'react';

const Timer = (props) => {

  const { gameState, setEndTime, stopTimer } = props

  const [startTime, setStartTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if(stopTimer){
      setEndTime(currentTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopTimer]);

  useEffect(() => {
    if (gameState === 1) {
      setStartTime(Date.now());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    if (gameState === 1 && !stopTimer) {
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setCurrentTime(elapsed);
      }, 10);

      return () => {
        clearInterval(timer);
      };
    }

  }, [startTime, gameState, stopTimer]);

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