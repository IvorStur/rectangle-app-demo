import React, { createContext, useState, useContext } from "react";

// Create Context
const GameContext = createContext();

// Provider Component
export const GameProvider = ({ children }) => {
  const [numbers, setNumbers] = useState([]); // Numbers list
  const [timeList, setTimeList] = useState([]); // Assigned times

  return (
    <GameContext.Provider
      value={{ numbers, setNumbers, timeList, setTimeList }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use context
export const useGame = () => useContext(GameContext);
