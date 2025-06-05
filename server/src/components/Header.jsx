import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function Header() {
  const { round, maxRounds } = useGame();
  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-xl font-bold">
        Dark Truth or Dare
      </Link>
      <div>
        <span>
          Round {round} / {maxRounds}
        </span>
      </div>
    </header>
  );
}
