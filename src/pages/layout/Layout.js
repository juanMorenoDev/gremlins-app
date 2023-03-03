import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Login";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./Navbar";
import {user} from "../../redux/store"
import { useSelector } from "react-redux";

function Layout() {
  const user = useSelector((state) => state.user);
  console.log(user)

  return (
    <>
      <NavBar />
      <Outlet />
       { 
        !user.userId && <Header /> } 
      <Footer />
    </>
  );
}

export default Layout;
