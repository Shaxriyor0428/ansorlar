import { api } from ".";

const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getTasks: build.query({
      query: () => `/tasks`,
      providesTags: ["Tasks", "Managers", "Employees"],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks", "Employees", "Managers"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
} = taskApi;
