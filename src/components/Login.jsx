import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useGetTokenMutation } from "../redux/api/get-token";
import { useDispatch } from "react-redux";
import { saveToken } from "../redux/slices/token";

const initialState = {
  email: "",
  password: "",
  error: "",
};

const Login = ({ close }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(initialState);

  const [getToken] = useGetTokenMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(data).unwrap(); 
      dispatch(saveToken(token.accessToken));
      setData(initialState);
      close()
    } catch (error) {
      setData((prevData) => ({
        ...prevData,
        error: error.data || "Failed to login. Please try again.",
      }));
    }
  };

  return (
    <div className="w-[400px] my-6 bg-white rounded-lg shadow-lg p-8 relative">

      <h2 className="text-center text-2xl font-bold text-gray-800">Kirish</h2>

      <form action="#" onSubmit={handleForm} className="mt-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            type="text"
            placeholder="Email"
            id="email"
          />
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Parol
          </label>
          <div className="relative">
            <input
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full outline-none rounded-lg py-3 px-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(!showPassword)}
                size={20}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                size={20}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500"
              />
            )}
          </div>
            {data.error && <p className="text-red-500 mt-2">{data.error}</p>}
        </div>
        <button type="submit" className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transition-all">
          Kirish
        </button>
      </form>
    </div>
  );
};

export default Login;
