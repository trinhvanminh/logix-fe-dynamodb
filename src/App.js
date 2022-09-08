import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Backdrop, CircularProgress, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoginPopUp from "./components/LoginPopUp";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  default: {
    bgColor: "#06121e",
    secondBgColor: "#091c2d",
    purple: "#61166178",
    lightPurple: "#611661",
  },
});

export default function App() {
  const { loading } = useSelector((state) => state.Global);
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer limit={3} />
      <LoginPopUp />
      <CssBaseline />
      <Outlet />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
