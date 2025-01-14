import React, { useEffect, useState } from "react";
import empty from "../assets/empty.png";
import { useSelector } from "react-redux";
import TaskModal from "../components/TaskModal";
import { useGetSingleEmployeeQuery, useGetSingleManagerQuery } from "../redux/api/stuffs";
const Home = () => {
  const selectedEmployee = useSelector(
    (state) => state.employee.selectedEmployee
  );
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { data, isLoading: employeeTasksLoading } =
    selectedEmployee.type === "employee"
      ? useGetSingleEmployeeQuery(selectedEmployee?.id)
      : useGetSingleManagerQuery(selectedEmployee?.id); 
      useEffect(() => {
    
  }, [data]);
  if (!selectedEmployee) {
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
  }
  return (
    <div className="ml-6 mt-8 border rounded-2xl w-[756px] pt-8 pl-7 pb-[52px]">
      <div className="bg-white rounded-lg w-full max-w-md">
        <h2 className="text-xl font-medium text-[#2C3030] mb-1">
          manager {selectedEmployee.name}
        </h2>
        <p className="text-[#9A9C9C] mb-4">{selectedEmployee.last_name}</p>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Hunarlari/tasks:
        </h3>
        <ul className="list-decimal list-inside text-gray-600 space-y-1 mb-6">
          {data?.tasks?.map((task, index) => (
            <li key={index}>{task.name}</li>
          ))}
        </ul>
        <button
          onClick={openModal}
          className="bg-[#14B890] text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Task qo'shish
        </button>
      </div>
      {isModalOpen && (
        <TaskModal close={closeModal} employee={selectedEmployee} />
      )}
    </div>
  );
};

export default Home;
