import { useGame } from "../context/GameContext";

export default function Results() {
  const { players, resetGame } = useGame();
  const sorted = [...players].sort((a, b) => b.score - a.score);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl mb-4">Game Over</h2>
      <ul className="mb-6 space-y-2">
        {sorted.map((p) => (
          <li
            key={p.id}
            className="flex justify-between w-64 p-2 bg-gray-700 rounded"
          >
            <span>{p.mbti}</span>
            <span>Score: {p.score}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={resetGame}
        className="bg-red-600 px-6 py-2 rounded hover:bg-red-500"
      >
        Play Again
      </button>
    </div>
  );
}
