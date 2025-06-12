import { useEffect, useState } from "react";
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
    const anyMissing = mbtis.some((mbti) => mbti === "");
    if (anyMissing) {
      alert("Please select MBTI for all players.");
      return;
    }

    const initialPlayers = mbtis.map((mbti, idx) => ({
      id: idx,
      mbti,
      score: 0,
    }));
    setPlayers(initialPlayers);
    navigate("/game");
  };
  useEffect(() => {
    const storedMBTI = localStorage.getItem("mbtiResult");
    if (storedMBTI) {
      setMbtis((prev) => {
        const updated = [...prev];
        updated[0] = storedMBTI;
        return updated;
      });
      localStorage.removeItem("mbtiResult");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] to-[#2c5364]">
      <div className="bg-black bg-opacity-20 backdrop-blur-md border border-blue-400 shadow-2xl rounded-2xl p-10 w-full max-w-lg transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8 tracking-wider drop-shadow-lg">
          <span className="inline-block animate-pulse">MBTI Game Setup</span>
        </h2>

        <label className="block mb-8 text-lg font-semibold text-blue-500 text-center">
          <span className="mr-2">Number of players:</span>
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
            className="w-20 p-2 rounded-lg bg-blue-900 text-blue-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center font-bold"
          />
        </label>

        <div className="space-y-5 mb-8">
          {mbtis.map((mbti, i) => (
            <div key={i} className="flex items-center space-x-3">
              <span className="text-blue-200 font-bold w-8 text-right">
                {i + 1}
              </span>
              <select
                value={mbti}
                onChange={(e) => handleChange(i, e.target.value)}
                className="flex-1 p-2 rounded-lg bg-blue-900 text-blue-100 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select MBTI</option>
                {allMBTITypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-extrabold py-3 rounded-xl shadow-xl transition duration-200 text-lg tracking-wide"
          onClick={begin}
        >
          🚀 Begin Game
        </button>

        <div className="mt-6 text-center text-blue-200 text-sm opacity-80">
          <span className="italic">Don't know your MBTI?</span>
          <br />
          <button
            onClick={() => navigate("/quiz")}
            className="mt-2 underline text-blue-400 hover:text-blue-200 transition"
          >
            👉 Take the quick MBTI quiz
          </button>
        </div>
      </div>
    </div>
  );
}
