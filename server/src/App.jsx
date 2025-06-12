import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import Home from "./pages/Home";
import PlayerSetup from "./pages/PlayerSetup";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<PlayerSetup />} />
          <Route path="/game" element={<Game />} />
          <Route path="/results" element={<Results />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
