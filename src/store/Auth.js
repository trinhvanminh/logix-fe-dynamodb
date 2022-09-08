import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, { payload }) => {
      state.authenticated = payload;
    },
  },
});
export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
