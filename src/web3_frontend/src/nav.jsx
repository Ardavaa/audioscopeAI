import { useEffect } from "react";
import './index.css';

export default function Nav() {
  return (
    <div className="flex justify-center mt-5 w-full">
      <nav className="bg-white shadow-lg p-3 px-8 rounded-full w-full max-w-[88.7%] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/assets/logo.png" alt="Logo" className="h-8"/>
          <span className="text-teal-600 font-semibold">Audioscope AI</span>
        </div>
        <div className="flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-teal-600">Home</a>
          <a href="#" className="hover:text-teal-600">Predict</a>
        </div>
        <button className="bg-[#54B2B0] border-white/60 text-white px-4 py-2 shadow-md rounded-full hover:bg-[#7ad2d0] transition flex">
            Start Diagnosis <img src="/assets/sparkles.png" alt="sparkles" className="ml-2" />
          </button>
      </nav>
    </div>
  );
}
