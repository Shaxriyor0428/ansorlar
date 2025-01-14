import Modal from "./Modal";
import { useEffect, useState } from "react";
import {
  useCreateEmployeeMutation,
  useCreateManagerMutation,
} from "../redux/api/stuffs";

const initialState = {
  type: "",
  name: "",
  last_name: "",
  email: "",
  is_active: "",
  error: "",
};

const CreateStaff = ({ setOpen, isUpdate, Data }) => {
  const [data, setData] = useState(initialState);

  const [createManager] = useCreateManagerMutation();
  const [createEmployee] = useCreateEmployeeMutation();

  console.log(Data);
  useEffect(() => {
    if (Data) {
      setData(Data);
    }
  }, [Data]);

  console.log(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCancel = (e) => {
    // e.preventDefault();
    setOpen(false);
    setData(initialState);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        if(data.type == "manager"){
          await updateManager(data).unwrap();
        } else {
          await updateEmployee(data).unwrap();
        }
      } else {
        if (data.type === "manager") {
          await createManager(data).unwrap();
        } else {
          await createEmployee(data).unwrap();
        }
      }
      setData(initialState);
      setOpen(false);
    } catch (error) {
      setData((prevData) => ({
        ...prevData,
        error: error.data?.message || "Failed to submit. Please try again.",
      }));
    }
  };

  return (
    <Modal>
      <div className="w-[400px] my-6 bg-white rounded-lg shadow-lg p-8 relative">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {isUpdate ? "Xodimni o'zgartirish" : "Xodim yaratish"}
        </h2>

        <form action="#" onSubmit={handleForm} className="mt-6">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="last_name"
              className="text-sm font-medium text-gray-600"
            >
              Familiya
            </label>
            <input
              name="last_name"
              value={data.last_name}
              onChange={handleChange}
              required
              className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              type="text"
              placeholder="Familiya"
              id="last_name"
            />
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Ismi
            </label>
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              type="text"
              placeholder="Ism"
              id="name"
            />
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              type="email"
              placeholder="Email"
              id="email"
            />
            <label htmlFor="type" className="text-sm font-medium text-gray-600">
              Xodim turi
            </label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              required
              className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              id="type"
            >
              <option value="">Tanlang</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-600"
            >
              Holati
            </label>
            <select
              name="is_active"
              value={data.is_active}
              onChange={handleChange}
              required
              className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              id="is_active"
            >
              <option value="">Tanlang</option>
              <option value="true">Active</option>
              <option value="false">Block</option>
            </select>
            {data.error && <p className="text-red-500 mt-2">{data.error}</p>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleCancel()}
              type="button"
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transition-all"
            >
              {isUpdate ? "O'zgartirish" : "Yaratish"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateStaff;
