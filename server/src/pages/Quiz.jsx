import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mbtiQuestions from "../data/mbtiQuestions";
import { useGame } from "../context/GameContext";

const Quiz = () => {
  const navigate = useNavigate();
  const { setPlayers } = useGame();
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });

  const handleAnswer = (side) => {
    if (side === "MAYBE") {
      if (index + 1 < mbtiQuestions.length) {
        setIndex(index + 1);
      } else {
        finishQuiz();
      }
      return;
    }

    setScores((prev) => ({ ...prev, [side]: prev[side] + 1 }));
    if (index + 1 < mbtiQuestions.length) {
      setIndex(index + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const mbti = [
      scores.E >= scores.I ? "E" : "I",
      scores.S >= scores.N ? "S" : "N",
      scores.T >= scores.F ? "T" : "F",
      scores.J >= scores.P ? "J" : "P",
    ].join("");

    localStorage.setItem("mbtiResult", mbti);
    navigate("/setup");
  };

  const q = mbtiQuestions[index];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl p-8 max-w-xl w-full text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-300">
          Question {index + 1} / {mbtiQuestions.length}
        </h2>
        {q ? (
          <>
            <p className="mb-8 text-2xl font-semibold text-white">
              {q.question}
            </p>
            <button
              className="bg-indigo-800 hover:bg-indigo-500 text-white px-6 py-3 mb-4 w-full rounded-lg text-lg font-medium transition cursor-pointer "
              onClick={() => handleAnswer(q.dichotomy[0])}
            >
              {q.optionA}
            </button>
            <button
              className="bg-red-600 hover:bg-red-400 text-white px-6 py-3 mb-4 w-full rounded-lg text-lg font-medium transition cursor-pointer"
              onClick={() => handleAnswer(q.dichotomy[1])}
            >
              {q.optionB}
            </button>
            <p className="mb-2 text-gray-400">Or maybe neither...</p>
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 w-full rounded-lg text-lg font-medium transition cursor-pointer"
              onClick={() => handleAnswer("MAYBE")}
            >
              Maybe / Depends on the situation
            </button>
          </>
        ) : (
          <p className="text-white">Loading question...</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
