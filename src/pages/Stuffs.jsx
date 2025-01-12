import React from "react";
import {
  useGetEmployeesQuery,
  useGetManagersQuery,
} from "../redux/api/employees";
import Employees from "../components/Employees";

import { IoIosSearch } from "react-icons/io";

const Stuffs = () => {
  const { data } = useGetEmployeesQuery({});
  const { data: managers } = useGetManagersQuery({});
  const userData = data?.concat(managers);

  return (
    <div className="p-6">
      <div>
        <button className="bg-[#14B890] text-white py-3 px-4 rounded-lg mt-[28px] mb-5">
          + Hodim qo'shish
        </button>
        <div className=" relative h-full w-full mb-3">
          <IoIosSearch className="text-xl absolute top-[50%] translate-y-[-50%] left-2" />
          <input
            type="text"
            className="py-3 pl-10 outline-none border rounded-lg w-[400px] px-2"
            placeholder="Ism bo'yicha qidirish"
          />
        </div>
      </div>
      <Employees data={userData}  status={"Yes"}/>
    </div>
  );
};

export default Stuffs;

