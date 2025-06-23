import { useGame } from "../context/GameContext";

export default function Results() {
  const { players, resetGame } = useGame();
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <h2 className="text-4xl font-bold mb-6 tracking-wide text-yellow-400 drop-shadow-lg">
        Game Over
      </h2>
      <ul className="mb-8 space-y-3 w-full max-w-md">
        {sorted.map((p, idx) => (
          <li
            key={p.id || idx}
            className={`flex justify-between items-center w-full p-4 rounded-lg shadow-lg border ${
              idx === 0
                ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-black border-yellow-400 font-bold scale-105"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <span className="uppercase tracking-wider">{p.mbti}</span>
            <span className="text-lg">Score: {p.score}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={resetGame}
        className="bg-gradient-to-r from-pink-600 via-red-600 to-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
      >
        Play Again
      </button>
    </div>
  );
}
