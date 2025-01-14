import React, { useState } from "react";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetTasksQuery,
} from "../redux/api/tasks";
import { IoIosSearch } from "react-icons/io";
import Modal from "../components/Modal";

const Tasks = () => {
  const { data } = useGetTasksQuery({});
  const [deleteTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation(); 
  const [updateTask] = useUpdateTaskMutation();

  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", type: "" });

  const [open, setOpen] = useState(false);
  const [remove, setRemove] = useState({ id: "", type: "" });

  const handleAddTaskModal = () => {setOpenAddTaskModal(true);};

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
// 
  const [editTask, setEditTask] = useState({ id: "", name: "", type: "" });
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);

  const handleEdit = (task) => {
    setEditTask({ id: task.id, name: task.name, type: task.type });
    setOpenEditTaskModal(true);
  };

  const handleEditTaskChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    updateTask(editTask);
    setOpenEditTaskModal(false);
    setEditTask({ id: "", name: "", type: "" });
  };

  const handleCloseEditModal = () => {
    setOpenEditTaskModal(false);
    setEditTask({ id: "", name: "", type: "" });
  };
// 

  const handleCloseModal = () => {
    setOpenAddTaskModal(false);
    setNewTask({ name: "", type: "" });
  };

  const handleClick = (id, type) => {
    setOpen(true);
    setRemove({ id, type });
  };

  const handleDelModal = () => {
    deleteTask(+remove.id);

    setOpen(false);
  };

  const cancelDelete = () => {
    setOpen(false);
    setRemove({ id: "", type: "" });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    createTask(newTask);
    handleCloseModal();
  };

  return (
    <div className="flex gap-4 mt-5 ml-[30px] flex-col mb-10">
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
              Vazifani o'chirish
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
      ,



      {openEditTaskModal && (
        <Modal>
          <div className="bg-white rounded-xl shadow-2xl p-8 w-[400px] max-w-[90%] text-black">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Vazifani tahrirlash
            </h3>
            <form onSubmit={handleUpdateTask} className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-600">
                Hodim turi
              </label>
              <select
                name="type"
                value={editTask.type}
                onChange={handleEditTaskChange}
                required
                className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Hodim turini tanlang</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>

              <label className="text-sm font-medium text-gray-600">
                Vazifa nomi
              </label>
              <input
                name="name"
                value={editTask.name}
                onChange={handleEditTaskChange}
                required
                className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                type="text"
                placeholder="Vazifa nomini kiriting"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md px-4 py-2 transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 py-2 transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}



      {openAddTaskModal && (
        <Modal>
          <div className="bg-white rounded-xl shadow-2xl p-8 w-[400px] max-w-[90%] text-black">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Vazifa qo'shish
            </h3>
            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-600">
                Hodim turi
              </label>
              <select
                name="type"
                value={newTask.type}
                onChange={handleTaskInputChange}
                required
                className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Hodim turini tanlang</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>

              <label className="text-sm font-medium text-gray-600">
                Vazifa nomi
              </label>
              <input
                name="name"
                value={newTask.name}
                onChange={handleTaskInputChange}
                required
                className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                type="text"
                placeholder="Vazifa nomini kiriting"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md px-4 py-2 transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 py-2 transition"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={handleAddTaskModal}
          className="bg-[#14B890] text-white py-3 px-4 rounded-lg text-nowrap"
        >
          + Vazifa qo'shish
        </button>
        <div className="relative h-full w-full">
          <IoIosSearch className="text-xl absolute top-[50%] translate-y-[-50%] left-2" />
          <input
            type="text"
            className="py-3 pl-10 outline-none border rounded-lg w-[400px] px-2"
            placeholder="Vazifa nomi bo'yicha qidirish"
          />
        </div>
      </div>
      <div className="w-full border border-gray-200 rounded-2xl pr-6">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 px-4 border-b last:border-b-0"
          >
            <div className="text-[#9A9C9C] w-[40%] truncate">{item.name}</div>
            <div className="text-[#000000DE] text-center w-[30%]">
              {item.type}
            </div>
            <div className="flex gap-4 w-[30%] justify-end">
              <button
                className="bg-[#14B890] text-white font-medium rounded-md px-4 py-2"
                onClick={() => handleEdit(item)}
              >
                O'zgartirish
              </button>

              <button
                onClick={() => handleClick(item?.id, item?.type)}
                className="bg-red-500 text-white font-medium rounded-md px-4 py-2"
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
