import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        {/* Spinner Icon */}
        <div className="mb-6">
          <FaSpinner className="text-6xl text-pink-500 animate-spin mx-auto" />
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">Loading</h2>
        <p className="text-gray-400">Please wait while we fetch the data...</p>

        {/* Animated Dots */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
