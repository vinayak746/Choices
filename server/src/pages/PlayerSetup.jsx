import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { allMBTITypes } from "../utils/mbtiUtils";

export default function PlayerSetup() {
  const [count, setCount] = useState(2);
  const [mbtis, setMbtis] = useState(["", ""]);
  const [confidence, setConfidence] = useState(null);
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
    const storedConfidence = localStorage.getItem("mbtiConfidence");

    if (storedMBTI) {
      setMbtis((prev) => {
        const updated = [...prev];
        updated[0] = storedMBTI;
        return updated;
      });
      if (storedConfidence) setConfidence(storedConfidence);
      localStorage.removeItem("mbtiResult");
      localStorage.removeItem("mbtiConfidence");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] to-[#2c5364] px-4">
      <div className="bg-black/40 backdrop-blur-lg border border-blue-500 shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-xl transition-all duration-300">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-400 mb-8 tracking-wider drop-shadow-lg">
          <span className="inline-block animate-pulse">MBTI Game Setup</span>
        </h2>
        {confidence && (
          <div className="mb-6 text-blue-100 text-center text-sm bg-blue-900/60 rounded-xl py-3 px-4 border border-blue-400 shadow">
            <p>
              🤖 Based on your quiz, we’re{" "}
              <strong>{confidence}% confident</strong> that your MBTI is{" "}
              <span className="underline">{mbtis[0]}</span>.
            </p>
            {parseInt(confidence) < 60 && (
              <p className="text-yellow-300 mt-2">
                ⚠️ Confidence is low — feel free to adjust or retake the quiz.
              </p>
            )}
          </div>
        )}
        <label className="block mb-8 text-lg font-semibold text-blue-300 text-center">
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
            className="w-20 p-2 rounded-lg bg-blue-950 text-blue-100 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center font-bold shadow"
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
                className="flex-1 p-2 rounded-lg bg-blue-950 text-blue-100 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
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
          className="w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-extrabold py-3 rounded-xl shadow-lg transition duration-200 text-lg tracking-wide"
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
