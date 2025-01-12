import { api } from ".";

const managerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getToken: build.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetTokenMutation } = managerApi;
