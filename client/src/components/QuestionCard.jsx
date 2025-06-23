export default function QuestionCard({
  prompt = {},
  timeLeft = 0,
  onDone = () => {},
}) {
  if (!prompt || !prompt.type || !prompt.text) {
    return (
      <div className="bg-gradient-to-br from-neutral-900 via-blue-900 to-neutral-800 p-6 rounded-2xl shadow-2xl mb-6 border-2 border-blue-700">
        <p className="text-blue-300 italic">
          Question data is missing or incomplete.
        </p>
      </div>
    );
  }

  // Set colors based on prompt.type
  let colorClasses = {
    bg: "from-neutral-900 via-blue-900 to-neutral-800",
    border: "border-blue-700",
    textType: "text-blue-400",
    textTime: "text-blue-300",
    buttonBg: "bg-blue-700 hover:bg-blue-500",
    buttonBorder: "border-blue-400",
    questionMark: "text-blue-700",
  };

  if (prompt.type.toLowerCase() === "truth") {
    colorClasses = {
      bg: "from-neutral-900 via-green-900 to-neutral-800",
      border: "border-green-700",
      textType: "text-green-400",
      textTime: "text-green-300",
      buttonBg: "bg-green-700 hover:bg-green-500",
      buttonBorder: "border-green-400",
      questionMark: "text-green-700",
    };
  } else if (prompt.type.toLowerCase() === "dare") {
    colorClasses = {
      bg: "from-neutral-900 via-red-900 to-neutral-800",
      border: "border-red-700",
      textType: "text-red-400",
      textTime: "text-red-300",
      buttonBg: "bg-red-700 hover:bg-red-500",
      buttonBorder: "border-red-400",
      questionMark: "text-red-700",
    };
  }

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses.bg} p-8 rounded-2xl shadow-2xl mb-6 ${colorClasses.border} border-2 relative overflow-hidden`}
    >
      <div
        className={`absolute -top-6 -right-6 opacity-20 pointer-events-none select-none text-[8rem] font-extrabold ${colorClasses.questionMark}`}
      >
        ?
      </div>
      <p
        className={`text-3xl font-extrabold uppercase ${colorClasses.textType} tracking-widest drop-shadow-lg`}
      >
        {prompt.type}
      </p>
      <p className="mt-4 text-neutral-100 text-lg italic">{prompt.text}</p>
      <div className="mt-6 flex items-center gap-2">
        <span className="font-medium text-neutral-400">⏳ Time left:</span>
        <span className={`font-bold ${colorClasses.textTime} animate-pulse`}>
          {timeLeft}s
        </span>
      </div>
      <button
        onClick={onDone}
        className={`mt-8 px-6 py-3 ${colorClasses.buttonBg} rounded-xl text-white font-bold shadow-lg transition-all duration-150 ${colorClasses.buttonBorder} border-2`}
      >
        Finish Question
      </button>
    </div>
  );
}
