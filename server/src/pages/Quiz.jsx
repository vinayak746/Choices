// src/pages/Quiz.jsx
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
    ].join(""); // Store MBTI in localStorage

    localStorage.setItem("mbtiResult", mbti); // Go back to setup

    navigate("/setup");
  };

  const q = mbtiQuestions[index];

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">
        Question {index + 1} / {mbtiQuestions.length}
      </h2>
      {q ? (
        <>
              <p className="mb-6 text-xl font-semibold">{q.question}</p>   {" "}
          <button
            className="bg-blue-600 text-white px-4 py-2 mb-4 w-full rounded"
            onClick={() => handleAnswer(q.dichotomy[0])}
          >
                  {q.optionA}   {" "}
          </button>
             {" "}
          <button
            className="bg-purple-600 text-white px-4 py-2 w-full rounded"
            onClick={() => handleAnswer(q.dichotomy[1])}
          >
                  {q.optionB}   {" "}
          </button>
           {" "}
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default Quiz;
