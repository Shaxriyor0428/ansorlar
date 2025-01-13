import React, { useState } from "react";
import { Pagination, MenuItem, Select } from "@mui/material";

const Employees = ({ data, route }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredUsers =
    route === "block"
      ? data?.filter((user) => !user?.isActive)
      : route === "manager"
      ? data?.filter((user) => user?.type === "manager")
      : data;

  const paginatedUsers = filteredUsers?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div className="p-4">
      <table className="w-full">
        <thead className="bg-gray-200 h-[76px]">
          <tr>
            <th className="p-2 text-left">Familiya Ism</th>
            <th className="p-2 text-left">Turi</th>
            <th className="p-2 text-left">E-mail</th>
            <th className="p-2 text-left">Holati</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers?.map((user, inx) => (
            <tr key={inx} className="hover:bg-gray-100">
              <td className="border-b p-2">
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
                  <span className="py-1 px-2 rounded-md text-red-500 bg-red-100">
                    Block
                  </span>
                )}
              </td>
              <td className="border-b p-2 flex justify-end space-x-2 ">
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

      <div className="flex justify-between items-center my-6 p-3">
        <div>
          {`${(page - 1) * rowsPerPage + 1}–${Math.min(
            page * rowsPerPage,
            filteredUsers?.length
          )} из ${filteredUsers?.length || 0}`}
        </div>
        <Pagination
          count={Math.ceil(filteredUsers?.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
        <div className="flex items-center space-x-4">
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            displayEmpty
            variant="outlined"
            size="small"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Employees;
