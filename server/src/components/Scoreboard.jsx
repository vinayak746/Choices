import { useGame } from "../context/GameContext";

export default function Scoreboard() {
  const { players, currentPlayerIndex } = useGame();
  return (
    <div className="flex space-x-4 mb-6">
      {players.map((p, idx) => (
        <div
          key={p.id}
          className={`bg-gradient-to-br from-indigo-800 to-purple-900 shadow-lg p-3 rounded-lg text-center w-28 border-2 ${
            idx === currentPlayerIndex
              ? "border-yellow-400 scale-105"
              : "border-transparent"
          } transition-all duration-200`}
        >
          <p className="font-extrabold text-lg text-yellow-300 drop-shadow">
            {p.mbti}
          </p>
          <p className="text-white text-sm">
            Score: <span className="font-semibold">{p.score}</span>
          </p>
          {idx === currentPlayerIndex && (
            <p className="text-yellow-400 text-xl mt-1 animate-bounce">▶</p>
          )}
        </div>
      ))}
    </div>
  );
}
