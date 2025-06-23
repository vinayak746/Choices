// src/pages/Difficulty.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const difficulties = ["Easy", "Medium", "Hard"];

export default function Difficulty() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleSelect = (level) => {
    setSelected(level);
    localStorage.setItem("difficultyLevel", level);
    setTimeout(() => navigate("/game"), 500); // Slight delay for smoother UX
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
           {" "}
      <div className="bg-black/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
               {" "}
        <h1 className="text-3xl font-bold mb-6">🎯 Choose Difficulty</h1>       {" "}
        <div className="space-y-4">
                   {" "}
          {difficulties.map((level) => (
            <button
              key={level}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition
                ${
                selected === level
                  ? "bg-gradient-to-r from-green-400 to-blue-500"
                  : "bg-white/10 hover:bg-white/20"
              }
              `}
              onClick={() => handleSelect(level)}
            >
                            {level}           {" "}
            </button>
          ))}
                 {" "}
        </div>
               {" "}
        <p className="mt-6 text-sm text-gray-300">
                    Difficulty affects how spicy or deep the questions get 🔥  
               {" "}
        </p>
             {" "}
      </div>
         {" "}
    </div>
  );
}
