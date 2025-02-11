import React, { useState, useEffect } from "react";
import { useGame } from "../GameContext.js"; // Import Context
import "./BoxComponent.css"; // Import styles

function BoxComponent() {
  const { numbers, timeList } = useGame();
  const [now, setNow] = useState("");
  const [nextIndex, setNextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [preparing, setPreparing] = useState(true);

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (numbers.length > 0) {
      startPreparingPhase(0);
    }
  }, []);

  const startPreparingPhase = (index) => {
    if (index >= numbers.length) {
      setNow("Finished");
      return;
    }

    setProgress(100);
    setTimeout(() => {
      setProgress(0);
      setPreparing(false);
      startNextGame(index);
    }, 8000);
  };

  const startNextGame = (index) => {
    if (index >= numbers.length) {
      setNow("Finished");
      setProgress(0);
      return;
    }

    setSlideIn(true);
    setNow(numbers[index]);
    setRemainingTime(timeList[index]);
    const currentTime = timeList[index];

    setSlideIn(false);

    setNextIndex(index + 1);

    const countdown = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      startNextGame(index + 1);
    }, currentTime * 1000);

    // setTimeout(() => {
    //   setNextIndex(index + 1);

    //   const countdownInterval = setInterval(() => {
    //     setRemainingTime((prev) => {
    //       if (prev <= 1) {
    //         clearInterval(countdownInterval);
    //         startPreparingPhase(index + 1);
    //         return 0;
    //       }
    //       return prev - 1;
    //     });
    //   }, 1000);
    // }, 500);
  };

  return (
    <div className="container">
      <h1 className="title">{preparing ? "Preparing" : "Playing"}</h1>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>

      <p className="label">Now</p>
      <div className={`box ${slideIn ? "slide-in" : ""}`}>
        {now || "Waiting..."}
      </div>

      <p className="label">Time Remaining</p>
      <div className="timer-box">
        {remainingTime > 0 ? remainingTime : "..."}
      </div>

      <p className="label">Next game</p>
      <div className="box">{numbers[nextIndex] || "Finished"}</div>
    </div>
  );
}

export default BoxComponent;
