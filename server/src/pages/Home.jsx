import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <h1 className="text-4xl mb-4">Dark Truth or Dare</h1>
      <button
        onClick={() => navigate("/setup")}
        className="bg-red-600 px-6 py-2 rounded"
      >
        Start
      </button>
    </div>
  );
}
