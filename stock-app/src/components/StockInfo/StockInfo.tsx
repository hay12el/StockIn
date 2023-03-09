import React, { FC, useEffect, useState } from "react";
import "./StockInfo.css";
import { onlyTwoNums } from "../StocksTable/StocksTable";

export interface IStock {
  stockName: string;
  priceAndAmount: number[];
  stockCurrentPrice: number;
}

type props = {
  stock: IStock;
  setModalTableShow: (x: boolean) => void;
  setStockForTable: React.Dispatch<React.SetStateAction<IStock | undefined>>;
};

const StockInfo: FC<props> = ({ stock,  setStockForTable, setModalTableShow }) => {


  const setModel1Info = (stock:IStock) => {
    setStockForTable(stock);
    setModalTableShow(true);
  }

  return (
    <div>
      <div className="contstock" onClick={() => setModel1Info(stock)}>
        <div className="lowerS">
          <p>{stock.stockName}</p>
        </div>
        <div className="lowerS">
          <p>{stock.stockName}</p>
          <p>{onlyTwoNums(stock.stockCurrentPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
