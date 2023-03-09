import React, { FC } from "react";
import NavBar from "../../components/navBar/NavBar";
import { Outlet } from "react-router-dom";
import './mainPage.css'
import Loader from "../../components/Loader/Loader";

const MainPage: FC = ({}) => {
  return (
    <div className="MainPage">
      <Loader />
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainPage;
