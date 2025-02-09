import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../GameContext.js"; // Import Context
import "./BoxComponent.css"; // Import styles

function InitComponent() {
  const [box, setBox] = useState("");
  const { setNumbers } = useGame(); // Access context
  const navigate = useNavigate();

  const handleSubmit = () => {
    const numArray = box.split(",").map((num) => num.trim());
    setNumbers(numArray);
    navigate("/time");
  };

  return (
    <div className="container">
      <input
        type="text"
        className="box"
        placeholder="Enter numbers (comma-separated)"
        value={box}
        onChange={(e) => setBox(e.target.value)}
      />
      <button onClick={handleSubmit} className="mb-4">
        OK
      </button>
    </div>
  );
}

export default InitComponent;
