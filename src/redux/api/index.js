import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks", "Employees", "Managers", "Users"],
  endpoints: () => ({}),
});
