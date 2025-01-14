import { api } from ".";

const managerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleEmployee: build.query({
      query: (id) => `/employees/${id}`,
      providesTags: ["Employees"],
    }),
    getSingleManager: build.query({
      query: (id) => `/managers/${id}`,
      providesTags: ["Managers"],
    }),
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
    deleteManager: build.mutation({
      query: (id) => ({
        url: `/managers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Managers", "Employees"],
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees", "Managers"],
    }),
    createManager: build.mutation({
      query: (body) => ({
        url: "/managers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Managers"],
    }),
    createEmployee: build.mutation({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    addTasksForManager: build.mutation({
      query: ({ managerId, body }) => ({
        url: `/managers/${managerId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Managers"],
    }),
    addTasksForEmployee: build.mutation({
      query: ({ employeeId, body }) => ({
        url: `/employees/${employeeId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    managerSearchByName: build.query({
      query: (name) => `/managers?name_like=${name}`,
      providesTags: ["Managers"],
    }),
    employeeSearchByName: build.query({
      query: (name) => `/employees?name_like=${name}`,
      providesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetSingleEmployeeQuery,
  useGetSingleManagerQuery,
  useGetManagersQuery,
  useGetEmployeesQuery,
  useGetAllEmployeesQuery,
  useGetAllManagersQuery,
  useDeleteManagerMutation,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation,
  useCreateManagerMutation,
  useAddTasksForManagerMutation,
  useAddTasksForEmployeeMutation,
  useManagerSearchByNameQuery,
  useEmployeeSearchByNameQuery
} = managerApi;
