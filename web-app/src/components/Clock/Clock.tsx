import { useState, useEffect } from "react";
import "../Clock/Clock.scss";

function Clock() {
  const [date, setDate] = useState<Date>(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return <span className="time">{date.toLocaleTimeString()}</span>;
}

export default Clock;
