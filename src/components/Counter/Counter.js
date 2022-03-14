import React, { useState, useEffect } from "react";

function Counter(props) {
  const { label, number, duration } = props.data;

  // number displayed by component
  const [count, setCount] = useState("0");

  useEffect(() => {
    let start = 0;
    const end = parseInt(number.toString().substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.toString().substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);
    // dependency array
  }, [number, duration]);

  return (
    <div className="Counter">
      <h2>{label}</h2>
      <h1>{count}</h1>
    </div>
  );
}

export default Counter;
