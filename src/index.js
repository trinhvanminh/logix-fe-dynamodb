import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./pages/MainLayout";
import { Provider } from "react-redux";
import store from "./store";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="" element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route
              path="reset-password/confirm/:userToken"
              element={<ResetPassword />}
            />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
