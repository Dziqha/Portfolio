"use client";
import React, { useEffect, useState } from "react";
import "../app/Clock.css";

const Clock = () => {
  useEffect(() => {
    const updateTime = () => {
      const hourHand = document.querySelector(".hour");
      const minuteHand = document.querySelector(".minute");
      const secondHand = document.querySelector(".second");

      const date = new Date();
      const secToDeg = (date.getSeconds() / 60) * 360;
      const minToDeg = (date.getMinutes() / 60) * 360;
      const hrToDeg = (date.getHours() / 12) * 360;

      secondHand.style.transform = `rotate(${secToDeg}deg)`;
      minuteHand.style.transform = `rotate(${minToDeg}deg)`;
      hourHand.style.transform = `rotate(${hrToDeg}deg)`;
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime(); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <div className="clock">
        {[...Array(12)].map((_, i) => (
          <label key={i} style={{ "--i": i + 1 }}>
            <span>{i + 1}</span>
          </label>
        ))}
        <div className="indicator">
          <span className="hand hour"></span>
          <span className="hand minute"></span>
          <span className="hand second"></span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
