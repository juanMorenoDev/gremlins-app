import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Login";
import Footer from "./Footer";
import NavBar from "./Navbar";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
