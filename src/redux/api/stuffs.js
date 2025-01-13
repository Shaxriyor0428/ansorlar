import { api } from ".";

const managerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getManagers: build.query({
      query: ({ page = 1, limit = 5 }) =>
        `/managers?_limit=${limit}&_page=${page}`,
      providesTags: ["Managers", "Employees"],
    }),
    getEmployees: build.query({
      query: ({ page = 1, limit = 5 }) =>
        `/employees?_limit=${limit}&_page=${page}`,
      providesTags: ["Employees", "Managers"],
    }),
    getAllManagers: build.query({
      query: () => `/managers`,
      providesTags: ["Managers"],
    }),
    getAllEmployees: build.query({
      query: () => `/employees`,
      providesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetManagersQuery,
  useGetEmployeesQuery,
  useGetAllEmployeesQuery,
  useGetAllManagersQuery,
} = managerApi;
