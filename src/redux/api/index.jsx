import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Modal from "../../components/Modal";
import Login from "../../components/Login";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("admin-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);
  if (
    result?.error?.status === 401 ||
    result?.error?.status === "FETCH_ERROR" ||
    result?.error?.data?.message === "jwt expired"
  ) {
    localStorage.removeItem("admin-token");
    <Modal>
      <Login />
    </Modal>;
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tasks", "Employees", "Managers", "Users"],
  endpoints: () => ({}),
});
