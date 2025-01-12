import { api } from ".";
const managerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getManagers: build.query({
      query: () => "/managers",
      providesTags: ["Managers"],
    }),
  }),
});

export const { useGetManagersQuery } = managerApi;
