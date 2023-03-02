import React, { FC } from "react";
import NavBar from "../../components/navBar/NavBar";
import { Outlet } from "react-router-dom";
import './mainPage.css'

const MainPage: FC = ({}) => {
  return (
    <div className="MainPage">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainPage;
