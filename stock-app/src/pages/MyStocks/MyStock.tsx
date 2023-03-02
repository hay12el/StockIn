import React, { FC } from "react";
import { useAppSelector } from "../../redux/Store";
import "./MyStock.css";
import StocksTable from "../../components/StocksTable/StocksTable";

const MyStock: FC = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="MyContainer">
      <div className="MyHeader">
        <div className="Myleft">
          <p>Hi {user.name},</p>
          <p>Manage Your Account Here</p>
        </div>
      </div>
      <div className="MyStocks">
        <StocksTable />
      </div>
    </div>
  );
};

export default MyStock;
