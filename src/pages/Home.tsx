
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Fungal Intelligence Platform</h1>
      <p className="text-lg mb-8">Your hub for fungal intelligence and research.</p>
      <Link to="/about" className="text-blue-500 hover:underline">
        Learn more about us
      </Link>
    </div>
  );
}

