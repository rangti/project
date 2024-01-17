import { color } from "d3";
import React, { useState, useEffect } from "react";

function Time(props) {
  const [currentTime, setCurrentTime] = useState();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() +1;
  const day = today.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <h6> {formattedDate} {currentTime} </h6>
    </div>
  );
}

export default Time;
