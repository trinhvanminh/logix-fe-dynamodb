import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default MainLayout;
