import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import token from "./slices/token";
import  selectEmployee  from "./slices/employeeSlice";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./slices/withLocalStorage";




const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    token,
    employee: selectEmployee,
    [api.reducerPath]: api.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;