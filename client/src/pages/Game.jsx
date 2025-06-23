import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import VotingModal from "../components/VotingModal";
import Scoreboard from "../components/Scoreboard";

export default function Game() {
  const {
    players,
    setPlayers,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    round,
    setRound,
    showVoting,
    setShowVoting,
    currentQuestion,
    setCurrentQuestion,
    resetGame,
  } = useGame();

  const navigate = useNavigate();
  const [votes, setVotes] = useState({ yes: 0, no: 0 });
  const [timeLeft, setTimeLeft] = useState(30);

  const difficulty = localStorage.getItem("difficultyLevel") || "Medium";

  const getDifficultySettings = () => {
    switch (difficulty) {
      case "Easy":
        return { timer: 45, rounds: 2 };
      case "Hard":
        return { timer: 20, rounds: 5 };
      default:
        return { timer: 30, rounds: 3 };
    }
  };

  const { timer, rounds: maxRounds } = getDifficultySettings();

  useEffect(() => {
    if (players.length === 0) navigate("/setup");
  }, [players]);

  useEffect(() => {
    if (round > maxRounds) {
      navigate("/results");
      return;
    }

    const player = players[currentPlayerIndex];
    if (!player) return;

    const mbti = player.mbti;
    const level = difficulty.toLowerCase();
    const bank = questions[mbti]?.[level] || { truths: [], dares: [] };

    const type = Math.random() < 0.5 ? "truths" : "dares";
    const pool = bank[type];
    const idx = Math.floor(Math.random() * pool.length);
    const selectedQuestion = pool[idx] || "No question available.";

    setCurrentQuestion({ type: type.slice(0, -1), text: selectedQuestion });
    setShowVoting(false);
    setVotes({ yes: 0, no: 0 });

    setTimeLeft(timer);
    let seconds = timer;
    const interval = setInterval(() => {
      seconds -= 1;
      setTimeLeft(seconds);
      if (seconds <= 0) {
        clearInterval(interval);
        setShowVoting(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayerIndex, round]);

  const handleDoneEarly = () => {
    setShowVoting(true);
  };

  const handleVoteSubmit = (localVotes) => {
    const passed = localVotes.yes > localVotes.no;

    if (passed) {
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
        )
      );
    }

    setShowVoting(false);
    setTimeout(() => {
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, hasAnswered: true } : p
        )
      );

      const nextPlayer = (currentPlayerIndex + 1) % players.length;

      const allDoneThisRound = players.every((p, idx) =>
        idx === currentPlayerIndex ? true : p.hasAnswered
      );

      if (allDoneThisRound) {
        setPlayers((prev) => prev.map((p) => ({ ...p, hasAnswered: false })));
        setRound((r) => r + 1);
      }

      setCurrentPlayerIndex(nextPlayer);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <Scoreboard />
        <p className="text-white text-center text-sm mt-2">
          🎯 Difficulty: <span className="font-semibold">{difficulty}</span> •
          🕒 Timer: {timer}s • 🔁 Rounds: {maxRounds}
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl mt-8">
        {currentQuestion && !showVoting && (
          <div className="w-full">
            <QuestionCard
              prompt={currentQuestion}
              timeLeft={timeLeft}
              onDone={handleDoneEarly}
              className="rounded-2xl shadow-xl bg-white/90 text-gray-900 border-2 border-purple-300"
            />
          </div>
        )}

        {showVoting && (
          <div className="w-full">
            <VotingModal
              onVote={handleVoteSubmit}
              votes={votes}
              setVotes={setVotes}
              className="rounded-2xl shadow-xl bg-white/90 text-gray-900 border-2 border-pink-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
