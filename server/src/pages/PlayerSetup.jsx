import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { allMBTITypes } from "../utils/mbtiUtils";

export default function PlayerSetup() {
  const [count, setCount] = useState(2);
  const [mbtis, setMbtis] = useState(["", ""]);
  const { setPlayers } = useGame();
  const navigate = useNavigate();

  const handleChange = (i, value) => {
    const newMbtis = [...mbtis];
    newMbtis[i] = value;
    setMbtis(newMbtis);
  };

  const begin = () => {
    const initialPlayers = mbtis.map((mbti, idx) => ({
      id: idx,
      mbti,
      score: 0,
    }));
    setPlayers(initialPlayers);
    navigate("/game");
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-2xl">Player Setup</h2>
      <label className="block mt-4">
        Number of players:
        <input
          type="number"
          min={2}
          max={6}
          value={count}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setCount(val);
            setMbtis(new Array(val).fill(""));
          }}
          className="ml-2 p-1 text-black"
        />
      </label>
      {mbtis.map((mbti, i) => (
        <select
          key={i}
          value={mbti}
          onChange={(e) => handleChange(i, e.target.value)}
          className="block mt-2 text-black"
        >
          <option value="">Select MBTI</option>
          {allMBTITypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      ))}
      <button className="mt-4 bg-green-600 px-4 py-2" onClick={begin}>
        Begin Game
      </button>
    </div>
  );
}
