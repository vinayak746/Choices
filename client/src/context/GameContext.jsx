import { createContext, useContext, useState } from "react";
export const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(3);
  const [showVoting, setShowVoting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const resetGame = () => {
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setRound(1);
    setShowVoting(false);
    setCurrentQuestion(null);
  };

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        currentPlayerIndex,
        setCurrentPlayerIndex,
        round,
        setRound,
        maxRounds,
        showVoting,
        setShowVoting,
        currentQuestion,
        setCurrentQuestion,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
