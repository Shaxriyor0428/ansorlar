import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("admin-token") || "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("admin-token", action.payload);
    },
  },
});

export const { saveToken } = tokenSlice.actions;
export default tokenSlice.reducer;
