import React, { useState } from "react";
import Employees from "../components/Employees";
import {
  useGetAllEmployeesQuery,
  useGetAllManagersQuery,
} from "../redux/api/stuffs";
import { IoIosSearch } from "react-icons/io";
import CreateStaff from "../components/CreateStaff";

const Blokeds = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allEmployees } = useGetAllEmployeesQuery();
  const { data: allManagers } = useGetAllManagersQuery();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filteredEmployees = (allEmployees || []).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredManagers = (allManagers || []).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const combinedData = shuffleArray([
    ...filteredEmployees,
    ...filteredManagers,
  ]);

  const paginatedData = combinedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalCount = combinedData.length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when rows per page changes
  };

  return (
    <div className="p-6">
      <div>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#14B890] text-white py-3 px-4 rounded-lg mt-[28px] mb-5"
        >
          + Hodim qo'shish
        </button>
        {open && <CreateStaff setOpen={setOpen} />}

        <div className="relative h-full w-full mb-3">
          <IoIosSearch className="text-xl absolute top-[50%] translate-y-[-50%] left-2 cursor-pointer" />
          <input
            type="text"
            className="py-3 pl-10 outline-none border rounded-lg w-[400px] px-2"
            placeholder="Ism bo'yicha qidirish"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Employees
        data={paginatedData}
        route="block"
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Blokeds;
