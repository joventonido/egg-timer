"use client";

import { useState, useEffect } from "react";

const EggTimer = () => {
  const [seconds, setSeconds] = useState(300); // Start with 5 minutes (300 seconds)
  const [isRunning, setIsRunning] = useState(false);

  // Start or stop the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer to 5 minutes
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(300); // 5 minutes in seconds
  };

  useEffect(() => {
    if (isRunning && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000); // Update every second

      return () => clearInterval(interval); // Clean up interval on component unmount or when isRunning changes
    }
  }, [isRunning, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      <h2>Egg Timer</h2>
      <div>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
      </div>
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default EggTimer;
