import { useEffect, useState } from "react";

function Game() {
  // Your state and logic here

  // Example placeholders for missing variables and state
  const [timeLeft, setTimeLeft] = useState(30);
  const [showVoting, setShowVoting] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [votes, setVotes] = useState({ yes: 0, no: 0 });

  useEffect(() => {
    // Placeholder for your timer logic
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPlayerIndex, round]);

  const handleDoneEarly = () => {
    setShowVoting(true);
  };

  const handleVoteSubmit = (localVotes) => {
    const passed = localVotes.yes > localVotes.no;
    // Update score if passed
    if (passed) {
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
        )
      );
    }
    // Show a brief result message, then proceed
    setShowVoting(false);
    setTimeout(() => {
      // Mark current as answered
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, hasAnswered: true } : p
        )
      );
      // Determine next player or next round
      const nextPlayer = (currentPlayerIndex + 1) % players.length;
      const allDoneThisRound = players.every((p, idx) =>
        idx === currentPlayerIndex ? true : p.hasAnswered
      );
      if (allDoneThisRound) {
        // Reset hasAnswered flags
        setPlayers((prev) => prev.map((p) => ({ ...p, hasAnswered: false })));
        setRound((r) => r + 1);
      }
      setCurrentPlayerIndex(nextPlayer);
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <Scoreboard />
      {currentQuestion && !showVoting && (
        <div>
          <QuestionCard
            prompt={currentQuestion}
            timeLeft={timeLeft}
            onDone={handleDoneEarly}
          />
        </div>
      )}
      {showVoting && (
        <VotingModal
          onVote={handleVoteSubmit}
          votes={votes}
          setVotes={setVotes}
        />
      )}
    </div>
  );
}

export default Game;
