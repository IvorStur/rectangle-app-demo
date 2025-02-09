import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../GameContext.js"; // Import Context
import "./BoxComponent.css"; // Import styles

function TimeComponent() {
  const [time, setTime] = useState("");
  const { numbers, setTimeList } = useGame(); // Access context
  const navigate = useNavigate();

  const handleSubmit = () => {
    const timeArray = time.split(",").map((t) => parseInt(t.trim(), 10));
    setTimeList(timeArray);
    navigate("/box");
  };

  return (
    <div className="container">
      <label>Assign time to numbers</label>
      <input
        type="text"
        className="box"
        placeholder="Enter times (comma-separated)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleSubmit} className="mb-4">
        OK
      </button>
    </div>
  );
}

export default TimeComponent;
