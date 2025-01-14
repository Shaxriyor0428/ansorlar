import React, { useState } from "react";
import { Pagination, MenuItem, Select } from "@mui/material";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import {
  useDeleteEmployeeMutation,
  useDeleteManagerMutation,
} from "../redux/api/stuffs";
import CreateStaff from "./CreateStaff";
import { setSelectedEmployee } from "../redux/slices/employeeSlice";
import { useNavigate } from "react-router-dom";

const Employees = ({
  data,
  route,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  // const [editData, setEditData] = useState(intialState);
  const [remove, setRemove] = useState({ id: "", type: "" });
  const [deleteManager] = useDeleteManagerMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [editUser, setEditUser] = useState(null);

  const filteredUsers =
    route === "block"
      ? data?.filter((user) => !user?.isActive)
      : route === "manager"
      ? data?.filter((user) => user?.type === "manager")
      : data;

  const handleClick = (id, type) => {
    setOpen(true);
    setRemove({ id, type });
  };

  const handleDelModal = () => {
    if (remove.type === "manager") {
      deleteManager(+remove.id);
    } else {
      deleteEmployee(+remove.id);
    }
    setOpen(false);
  };

  const cancelDelete = () => {
    setOpen(false);
    setRemove({ id: "", type: "" });
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };

  const handleChangeStatus = (user) => {
    // console.log(user);
  };

  const handleGetEmployee = (user) => {
    dispatch(setSelectedEmployee(user));
    navigate("/");
  };

  return (
    <div className="p-4">
      {editOpen && (
        <CreateStaff
          Data={editUser}
          isUpdate={true}
          setEditOpen={setEditOpen}
          setOpen={setOpen}
        />
      )}
      {open && remove.id && (
        <Modal close={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-8 w-[400px] max-w-[90%] relative text-black">
            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute top-3 right-5 text-2xl text-gray-400 hover:text-gray-700 transition"
            >
              &times;
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Xodimnini o'chirish
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure delete this {remove.type}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md px-4 py-2 transition"
              >
                Yo'q
              </button>
              <button
                onClick={handleDelModal}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 py-2 transition"
              >
                Ha
              </button>
            </div>
          </div>
        </Modal>
      )}
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Familiya Ism</th>
            <th className="p-3 text-left">Turi</th>
            <th className="p-3 text-left">E-mail</th>
            <th className="p-3 text-left">Holati</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers?.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td
                onClick={() => handleGetEmployee(user)}
                className="border-b p-3"
              >
                {user?.name} {user?.last_name}
              </td>
              <td className="border-b p-3">{user?.type}</td>
              <td className="border-b p-3">{user?.email}</td>
              <td className="border-b p-3">
                {user?.isActive ? (
                  <span
                    onClick={() => handleChangeStatus(user)}
                    className="py-1 px-2 rounded-md text-green-500 bg-green-100"
                  >
                    Active
                  </span>
                ) : (
                  <span
                    onClick={() => handleChangeStatus(user)}
                    className="py-1 px-2 rounded-md text-red-500 bg-red-100"
                  >
                    Block
                  </span>
                )}
              </td>
              <td className="border-b p-3 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-green-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 transition"
                >
                  O'zgartirish
                </button>

                <button
                  onClick={() => handleClick(user?.id, user?.type)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-2 transition"
                >
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
            totalCount
          )} из ${totalCount}`}
        </div>
        <Pagination
          count={Math.ceil(totalCount / rowsPerPage)}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
        <div className="flex items-center space-x-4">
          <Select
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
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
