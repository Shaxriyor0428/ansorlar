import React, { useState } from "react";
import Employees from "../components/Employees";
import {
  useGetAllManagersQuery,
  useGetManagersQuery,
} from "../redux/api/stuffs";
import { IoIosSearch } from "react-icons/io";

const Managers = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const { data: managers, isLoading: managersLoading } = useGetManagersQuery({
    page,
    rowsPerPage,
  });

  const { data: allManagers } = useGetAllManagersQuery();

  const totalCount =
    allManagers?.filter((item) => item.type === "manager").length || 0;

  const userData = shuffleArray([...(managers || [])]);
  console.log(userData);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div className="p-6">
      <div>
        <button className="bg-[#14B890] text-white py-3 px-4 rounded-lg mt-[28px] mb-5">
          + Hodim qo'shish
        </button>
        <div className="relative h-full w-full mb-3">
          <IoIosSearch className="text-xl absolute top-[50%] translate-y-[-50%] left-2" />
          <input
            type="text"
            className="py-3 pl-10 outline-none border rounded-lg w-[400px] px-2"
            placeholder="Ism bo'yicha qidirish"
          />
        </div>
      </div>
      <Employees
        data={userData}
        route="manager"
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Managers;
