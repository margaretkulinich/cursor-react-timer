import React from "react";
import { Timer } from '././Timer/Timer.js';

function App() {
  return (
    <Timer 
      time={5000}
      step={500}
      autostart={true}
      onTick={(time) => console.log("Залишилось часу: " + time)}
      onTimeEnd={() => console.log("Час вийшов!")}
      onTimeStart={(timeLeft) => console.log("Таймер запущено!")}
      onTimePause={(timeLeft) => console.log("Таймер на паузі!")}
    />
  );
}

export default App;
