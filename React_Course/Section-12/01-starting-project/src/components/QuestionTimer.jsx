import React, { useEffect, useState } from "react";

function QuestionTimer({ timeout, onTimeOut, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeout);

    return () => {
        clearTimeout(timer);
    }
  }, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - 100);
    }, 100);

    return () => {
        clearInterval(interval);
    }
  }, []);

  return <progress max={timeout} value={remainingTime} className={mode}/>;
}

export default QuestionTimer;
