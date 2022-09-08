import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";
import Global from "./Global";
const store = configureStore({
  reducer: {
    Auth,
    Global,
  },
});
export default store;
