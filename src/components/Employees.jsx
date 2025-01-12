import React, { useState } from "react";
import { Pagination } from "@mui/material";

const Employees = ({ data }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const paginatedUsers = data?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div className="p-4">
      <table className="w-full">
        <thead className="bg-gray-200 h-[76px]">
          <tr>
            <th className="p-2 text-left">Familiya Ism</th>
            <th className=" p-2 text-left">Turi</th>
            <th className=" p-2 text-left">E-mail</th>
            <th className=" p-2 text-left">Holati</th>
            <th className=" p-2 text-center">Amallar</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers?.map((user, inx) => (
            <tr key={inx} className="hover:bg-gray-100">
              <td className=" border-b p-2">
                {user?.name} {user?.last_name}
              </td>
              <td className="border-b p-2">{user?.type}</td>
              <td className="border-b p-2">{user?.email}</td>
              <td className="border-b p-2">
                {user?.isActive ? (
                  <span className="py-1 px-2 rounded-md text-green-500 bg-green-100">
                    Active
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td className="border-b p-2 flex justify-center space-x-2 ">
                <button className="bg-[#14B890] text-white font-medium rounded-md px-4 py-2">
                  O'zgartirish
                </button>
                <button className="bg-red-500 text-white font-medium rounded-md px-4 py-2">
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center my-6">
        <Pagination
          count={3}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Employees;
