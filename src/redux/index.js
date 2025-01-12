import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import token from "./slices/token";

export const store = configureStore({
  reducer: {
    token,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
