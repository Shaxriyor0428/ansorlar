import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen text-gray-100 px-4">
      <div className="text-center  p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
        <h1 className="text-6xl sm:text-8xl md:text-9xl text-red-500 font-bold mb-4">
          404
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6">
          Ushbu sahifa mavjud emas
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-white bg-red-500 hover:bg-red-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-lg sm:text-xl transition-colors duration-300"
        >
         Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
};

export default NotFound;
