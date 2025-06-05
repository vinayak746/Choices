import { useGame } from "../context/GameContext";
import { useState } from "react";

export default function VotingModal({ onVote, votes, setVotes }) {
  const { players, currentPlayerIndex } = useGame();
  const totalVoters = players.length - 1;

  const handleClick = (type) => {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const canSubmit = votes.yes + votes.no >= totalVoters;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a2980] via-[#26d0ce] to-[#f2fcfe] bg-opacity-95 z-50 font-mono">
      <div className="relative bg-gradient-to-br from-[#ff512f] via-[#dd2476] to-[#1fa2ff] p-10 rounded-3xl w-[420px] text-white shadow-2xl border-4 border-[#fff200] backdrop-blur-lg bg-opacity-80 ring-4 ring-[#fff200]/40 ring-offset-2">
        {/* Header moved inside the box */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-5xl drop-shadow-lg animate-pulse">⚖️</span>
          <span className="text-2xl font-black tracking-widest text-white drop-shadow-lg">
            COUNCIL VOTE
          </span>
          <span className="text-5xl drop-shadow-lg animate-pulse">⚖️</span>
        </div>
        <h2 className="text-2xl font-extrabold mb-4 text-center mt-2 tracking-wide text-[#fff200] drop-shadow">
          The Chamber Decides
        </h2>
        <p className="mb-6 text-center text-[#f2fcfe] text-lg">
          Shall the fate of{" "}
          <span className="font-bold text-[#fff200] underline decoration-[#00ffb4] decoration-2">
            Player {currentPlayerIndex + 1}
          </span>{" "}
          be sealed as <span className="italic text-[#00ffb4]">passed</span>?
        </p>
        <div className="flex justify-around mb-8 gap-4">
          <button
            onClick={() => handleClick("yes")}
            className="px-8 py-3 bg-[#00ffb4] text-[#232946] font-extrabold rounded-xl shadow-lg border-2 border-[#fff200] hover:bg-[#00e6ac] hover:scale-110 focus:scale-105 transition-all duration-150 text-lg flex items-center gap-2 focus:ring-4 focus:ring-[#00ffb4]/40 ring-2 ring-[#00ffb4]/30"
          >
            <span className="text-2xl">🟢</span> Yes
          </button>
          <button
            onClick={() => handleClick("no")}
            className="px-8 py-3 bg-[#ff2975] text-white font-extrabold rounded-xl shadow-lg border-2 border-[#fff200] hover:bg-[#ff005c] hover:scale-110 focus:scale-105 transition-all duration-150 text-lg flex items-center gap-2 focus:ring-4 focus:ring-[#ff2975]/40 ring-2 ring-[#ff2975]/30"
          >
            <span className="text-2xl">🔴</span> No
          </button>
        </div>
        <div className="flex justify-center mb-6 gap-10 text-lg">
          <span>
            <span className="font-bold text-[#00ffb4]">{votes.yes}</span>{" "}
            <span className="text-white">Yes</span>
          </span>
          <span>
            <span className="font-bold text-[#ff2975]">{votes.no}</span>{" "}
            <span className="text-white">No</span>
          </span>
        </div>
        <p className="text-center text-sm mb-6 text-white">
          <span className="italic">Council needs</span>{" "}
          <span className="font-bold text-[#fff200]">{totalVoters}</span>{" "}
          <span className="italic">votes to decide</span>
        </p>
        <button
          onClick={() => onVote(votes)}
          disabled={!canSubmit}
          className={`mt-2 w-full py-3 rounded-xl font-black tracking-widest text-lg transition-all duration-150 shadow-lg ${
            canSubmit
              ? "bg-gradient-to-r from-[#00ffb4] via-[#fff200] to-[#ff2975] text-[#232946] hover:scale-105 ring-2 ring-[#fff200]/60"
              : "bg-[#232946] text-white cursor-not-allowed opacity-60"
          }`}
        >
          Cast Verdict
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white opacity-80 tracking-widest">
          Chamber of Fate &copy; 2024
        </div>
      </div>
    </div>
  );
}
