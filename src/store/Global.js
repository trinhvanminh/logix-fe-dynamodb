import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isOpenLoginPopUp: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setIsOpenLoginPopUp: (state, { payload }) => {
      state.isOpenLoginPopUp = payload;
    },
  },
});

export const { setLoading, setIsOpenLoginPopUp } = globalSlice.actions;

export default globalSlice.reducer;
