import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import NavBar from "./Navbar";
import { useSelector } from "react-redux";


function Layout() {
  const user = useSelector((state) => state.user);
  const partner = useSelector((state) => state.partner);
  console.log(user.userId);
  console.log(partner);

  return (
    <>
      <NavBar />
      <Outlet />
      
      <Footer />
    </>
  );
}

export default Layout;
