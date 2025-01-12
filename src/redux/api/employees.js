import { api } from ".";
const managerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getManagers: build.query({
      query: () => "/managers",
      providesTags: ["Managers"],
    }),
    getEmployees: build.query({
      query: () => "/employees",
      providesTags: ["Employees"],
    }),
  }),
});

export const { useGetManagersQuery, useGetEmployeesQuery } = managerApi;
