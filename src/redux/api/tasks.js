import { api } from ".";

const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query({
      query: ({ page = 1, limit = 5 }) =>
        `/tasks?_limit=${limit}&_page=${page}`,
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
