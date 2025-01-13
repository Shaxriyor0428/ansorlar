import React, { useState } from "react";
import Employees from "../components/Employees";
import {
  useGetAllEmployeesQuery,
  useGetAllManagersQuery,
  useGetEmployeesQuery,
  useGetManagersQuery,
} from "../redux/api/stuffs";
import { IoIosSearch } from "react-icons/io";
import CreateStaff from "../components/CreateStaff";

const Blokeds = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  let employeesLimit = Math.ceil((rowsPerPage * 3) / 5);
  let managersLimit = rowsPerPage - employeesLimit;

  if (rowsPerPage === 15) {
    employeesLimit = 9;
    managersLimit = 6;
  } else if (rowsPerPage === 20) {
    employeesLimit = 12;
    managersLimit = 8;
  }

  const { data: employees, isLoading: employeesLoading } = useGetEmployeesQuery(
    {
      page,
      limit: employeesLimit,
    }
  );

  const { data: managers, isLoading: managersLoading } = useGetManagersQuery({
    page,
    limit: managersLimit,
  });

  const { data: allEmployees } = useGetAllEmployeesQuery();
  const { data: allManagers } = useGetAllManagersQuery();

  const totalCount =
    (allEmployees?.filter((item) => item.isActive === false).length || 0) +
    (allManagers?.filter((item) => item.isActive === false).length || 0);

  if (employeesLoading || managersLoading) {
    return <div>Yuklanmoqda...</div>;
  }

  const userData = shuffleArray([...(employees || []), ...(managers || [])]);
  // console.log(userData);
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
        {open && <CreateStaff setOpen={setOpen} />}

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
