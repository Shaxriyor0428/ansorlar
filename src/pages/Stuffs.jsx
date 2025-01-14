import React, { useState, useEffect } from "react";
import {
  useEmployeeSearchByNameQuery,
  useManagerSearchByNameQuery,
  useGetEmployeesQuery,
  useGetManagersQuery,
  useGetAllEmployeesQuery,
  useGetAllManagersQuery,
} from "../redux/api/stuffs";
import Employees from "../components/Employees";
import { IoIosSearch } from "react-icons/io";
import CreateStaff from "../components/CreateStaff";

const Stuffs = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const { data: employees, isLoading: employeesLoading } = useGetEmployeesQuery(
    {
      page,
      limit: Math.ceil((rowsPerPage * 3) / 5),
    }
  );

  const { data: managers, isLoading: managersLoading } = useGetManagersQuery({
    page,
    limit: rowsPerPage - Math.ceil((rowsPerPage * 3) / 5),
  });

  const { data: allEmployees } = useGetAllEmployeesQuery();
  const { data: allManagers } = useGetAllManagersQuery();

  const { data: searchedEmployees } = useEmployeeSearchByNameQuery(searchTerm, {
    skip: !searchTerm,
  });
  const { data: searchedManagers } = useManagerSearchByNameQuery(searchTerm, {
    skip: !searchTerm,
  });

  const totalCount = searchTerm
    ? (searchedEmployees?.length || 0) + (searchedManagers?.length || 0)
    : (allEmployees?.length || 0) + (allManagers?.length || 0);

  const userData = searchTerm
    ? [...(searchedEmployees || []), ...(searchedManagers || [])]
    : [...(employees || []), ...(managers || [])];

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
        <button
          onClick={() => setOpen(true)}
          className="bg-[#14B890] text-white py-3 px-4 rounded-lg mt-[28px] mb-5"
        >
          + Hodim qo'shish
        </button>
        {open && <CreateStaff setOpen={setOpen} isUpdate={false} />}

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
        data={userData}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Stuffs;
