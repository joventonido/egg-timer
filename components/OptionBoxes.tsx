// components/OptionBoxes.js
// const [timers, setTimers] = useState([300, 360, 420, 480, 600]);
// components/OptionBoxes.js
"use client";

import React, { useState, useEffect } from "react";

const OptionBoxes = () => {
  // Initial state
  const [timers, setTimers] = useState([300, 360, 420, 480, 600]);
  const [isRunning, setIsRunning] = useState([
    false,
    false,
    false,
    false,
    false,
  ]); // Running state for each box
  const [hasPlayedSound, setHasPlayedSound] = useState([
    false,
    false,
    false,
    false,
    false,
  ]); // Sound played state for each box
  const [inputTimes, setInputTimes] = useState([300, 360, 420, 480, 600]); // User defined input times for each box

  // Function to start/pause the timer for a specific box
  const toggleTimer = (index: number) => {
    const newIsRunning = [...isRunning];
    newIsRunning[index] = !newIsRunning[index];
    setIsRunning(newIsRunning);
  };

  // Function to reset the timer for a specific box
  const resetTimer = (index: number) => {
    const newTimers = [...timers];
    const newInputTimes = [...inputTimes];

    // Reset to the user-defined time for that box
    newTimers[index] = newInputTimes[index];
    setTimers(newTimers);

    // Stop the timer for that box
    const newIsRunning = [...isRunning];
    newIsRunning[index] = false;
    setIsRunning(newIsRunning);

    // Reset sound played state
    const newHasPlayedSound = [...hasPlayedSound];
    newHasPlayedSound[index] = false;
    setHasPlayedSound(newHasPlayedSound);
  };

  // Function to update the timer state for each box
  const updateTimer = () => {
    setTimers((prevTimers) =>
      prevTimers.map((timer, index) => {
        // If the timer is running and has time left, decrease it
        if (isRunning[index] && timer > 0) {
          return timer - 1;
        } else if (isRunning[index] && timer === 0 && !hasPlayedSound[index]) {
          // Play sound when the timer reaches 0
          playSound();
          const newHasPlayedSound = [...hasPlayedSound];
          newHasPlayedSound[index] = true;
          setHasPlayedSound(newHasPlayedSound);
        }
        return timer;
      })
    );
  };

  // Function to play the sound notification
  const playSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  // Start the timer updates (runs every second)
  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isRunning]); // Run when isRunning changes

  // Format the timer as minutes:seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  // Function to update the input time for a specific box
  //   const handleTimeChange = (index, event) => {
  //     const newTime = parseInt(event.target.value, 10);

  //     if (!isNaN(newTime) && newTime > 0) {
  //       const newInputTimes = [...inputTimes];
  //       newInputTimes[index] = newTime;
  //       setInputTimes(newInputTimes);

  //       const newTimers = [...timers];
  //       newTimers[index] = newTime;
  //       setTimers(newTimers);
  //     } else {
  //       console.error("Please enter a valid positive number");
  //     }
  //   };

  return (
    <div className="box-container">
      {timers.map((timer, index) => (
        <div
          key={index}
          className="box"
          style={{
            backgroundImage: `url(/images/option${index + 1}.jpg)`, // Set background image for each box
          }}
        >
          <div className="box-title">Option {index + 1}</div>

          {/* Input field to set time for each box */}
          {/* <input
            type="number"
            value={inputTimes[index]}
            onChange={(event) => handleTimeChange(index, event)}
            className="time-input"
            min="1"
            max="3600"
          /> */}

          {/* Display the remaining time */}
          <div className="box-timer">{formatTime(timer)}</div>

          {/* Start/Pause Timer Button */}
          <button onClick={() => toggleTimer(index)} className="timer-button">
            {isRunning[index] ? "Pause Timer" : "Start Timer"}
          </button>

          {/* Reset Timer Button */}
          <button onClick={() => resetTimer(index)} className="reset-button">
            Reset Timer
          </button>
        </div>
      ))}
    </div>
  );
};

export default OptionBoxes;
