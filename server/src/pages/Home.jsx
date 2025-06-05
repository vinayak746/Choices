import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
        Dark Truth or Dare
      </h1>
      <p className="mb-8 text-lg text-gray-300 italic">
        Enter if you dare. Secrets and challenges await...
      </p>
      <button
        onClick={() => navigate("/setup")}
        className="bg-red-700 hover:bg-red-900 transition-colors px-8 py-3 rounded-lg shadow-lg text-xl font-semibold tracking-wider"
      >
        Start
      </button>
    </div>
  );
}
