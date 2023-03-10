import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { FC } from "react";

import Home from "../pages/Home/Home";
import LoginSignup from "../pages/LoginSignup/LoginSignup";
import MyStock from "../pages/MyStocks/MyStock";
import Stock from "../pages/Stock/Stock";
import MainPage from "../pages/MainPage/MainPage";
import SearchAndBuy from "../pages/SearchAndBuy/SearchAndBuy";

const MainRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}>
          <Route index element={<Home />} />
          <Route path="/loginsignup/:is" element={<LoginSignup />} />
          <Route path="/MyStock" element={<MyStock />} />
          <Route path="/Stock/:StockId" element={<Stock />} />
          <Route path="/SearchAndBuy" element={<SearchAndBuy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
