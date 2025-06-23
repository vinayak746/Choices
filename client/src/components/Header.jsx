import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function Header() {
  const { round, maxRounds } = useGame();
  return (
    <header className="bg-gradient-to-r from-purple-950 via-gray-900 to-black p-6 flex justify-between items-center text-white shadow-2xl border-b-4 border-pink-700">
      <Link
        to="/"
        className="flex items-center gap-3 text-3xl font-black tracking-widest text-pink-400 hover:text-pink-300 transition drop-shadow-lg"
      >
        <span role="img" aria-label="mask" className="animate-pulse">
          🎭
        </span>
        Dark Truth <span className="text-purple-400">&</span> Dare
      </Link>
      <div className="bg-gradient-to-r from-pink-900 via-gray-800 to-purple-900 rounded-xl px-6 py-3 text-xl font-bold shadow-inner border-2 border-pink-700 flex items-center gap-2">
        <span className="text-purple-300">Round</span>
        <span className="text-pink-400 text-2xl animate-bounce">{round}</span>
        <span className="text-purple-300">/</span>
        <span className="text-purple-200">{maxRounds}</span>
        <span role="img" aria-label="fire" className="ml-2 animate-flicker">
          🔥
        </span>
      </div>
    </header>
  );
}

// Add this to your CSS for the flicker effect:
// .animate-flicker {
//   animation: flicker 1.5s infinite alternate;
// }
// @keyframes flicker {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.6; }
// }
