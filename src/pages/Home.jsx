import React, { useState } from "react";
import empty from "../assets/empty.png";
const Home = () => {
  const [userData, setUserData] = useState(null);
  return (
    <div>
      {!userData && (
        <div className="flex justify-center items-center h-screen w-full">
          <div className=" container w-[296px] h-[256px] ">
            <img src={empty} alt="Bo'sh" />
            <p className="text-lg text-gray-500">Malumot yo'q</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
