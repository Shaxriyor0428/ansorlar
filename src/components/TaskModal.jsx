import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import {
  useAddTasksForEmployeeMutation,
  useAddTasksForManagerMutation,
  useGetSingleEmployeeQuery,
  useGetSingleManagerQuery,
} from "../redux/api/stuffs";
import { useGetTasksQuery } from "../redux/api/tasks";


const TaskModal = ({ close, employee }) => {
  const { data: allTasks = [], isLoading: allTasksLoading } = useGetTasksQuery(
    {}
  ); // Barcha mavjud vazifalar
  const { data, isLoading: employeeTasksLoading } =
    employee.type === "employee"
      ? useGetSingleEmployeeQuery(employee.id)
      : useGetSingleManagerQuery(employee.id); // Hodimning mavjud vazifalari

  const [updateEmployeeTasks] = useAddTasksForEmployeeMutation(); // Hodim vazifalarini yangilash
  const [updateManagerTasks] = useAddTasksForManagerMutation(); // Manager vazifalarini yangilash

  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    if (data?.tasks?.length > 0) {
      setSelectedTasks(data.tasks.map((task) => task)); // Hodimda mavjud vazifalarni belgilash
    }
  }, [data?.tasks]);

  const handleTaskChange = (task) => {
    // Vazifani tanlash yoki olib tashlash
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (employee.type === "employee") {
        await updateEmployeeTasks({
          employeeId: employee.id,
          tasks: selectedTasks,
        }); // Tanlangan vazifalarni yangilash
      } else {
        console.log(selectedTasks)
        await updateManagerTasks({
          managerId: employee.id,
          tasks: selectedTasks,
        }); // Tanlangan vazifalarni yangilash
      }
      close(); // Modalni yopish
    } catch (e) {
      console.error("Vazifalarni yangilashda xatolik:", e);
    }
  };

  return (
    <Modal close={close}>
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Vazifa qo'shish</h2>
        {allTasksLoading || employeeTasksLoading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          <div className="mb-4">
            <label className="block font-medium mb-2">Hodim turi</label>
            <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
              {allTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={selectedTasks.includes(task)} // Belgini tekshirish
                    onChange={() => handleTaskChange(task)}
                  />
                  <label htmlFor={`task-${task.id}`}>{task.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Добавить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
