import "./App.css";
import BoxComponent from "./components/BoxComponent";
import InitComponent from "./components/InitComponent";
import TimeComponent from "./components/TimeComponent";
import { GameProvider } from "./GameContext"; // Import Context
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InitComponent />} />
          <Route path="/time" element={<TimeComponent />} />
          <Route path="/box" element={<BoxComponent />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
