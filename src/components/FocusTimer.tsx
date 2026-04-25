// src/components/FocusTimer.tsx

import { useEffect, useState } from "react";
import "../styles/FocusTimer.css";

interface FocusTimerProps {
  taskTitle?: string;
}

export default function FocusTimer({ taskTitle }: FocusTimerProps) {
  const INITIAL_SECONDS = 180;
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const start = () => {
    setSecondsLeft(INITIAL_SECONDS);
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(INITIAL_SECONDS);
  };

  return (
    <div className="focus-timer">
      <h3 className="focus-timer-title">
        {taskTitle ? `Focus on: ${taskTitle}` : "3‑Minute Focus Timer"}
      </h3>

      <div className="focus-timer-display">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      {!isRunning ? (
        <button className="focus-timer-btn" onClick={start}>
          Start 3‑Minute Timer
        </button>
      ) : (
        <button className="focus-timer-btn" onClick={reset}>
          Reset
        </button>
      )}
    </div>
  );
}
