import React, { FC, useEffect, useState } from "react";
import "./StockInfo.css";
import { onlyTwoNums } from "../StocksTable/StocksTable";

export interface IStock {
  stockName: string;
  priceAndAmount: number[];
  stockCurrentPrice: { ratio: string; price: number };
}

type props = {
  stock: IStock;
  setModalTableShow: (x: boolean) => void;
  setStockForTable: React.Dispatch<React.SetStateAction<IStock | undefined>>;
};

const StockInfo: FC<props> = ({
  stock,
  setStockForTable,
  setModalTableShow,
}) => {
  const setModel1Info = (stock: IStock) => {
    setStockForTable(stock);
    setModalTableShow(true);
  };

  return (
    <div className="contstock" onClick={() => setModel1Info(stock)}>
      <div className="lowerSS">
        <p>{stock.stockName}</p>
      </div>
      <div className="lowerS">
        <div className="ls">
          {stock.stockCurrentPrice.ratio.charAt(1) === "−" ? (
            <>
              <span style={{ color: "red" }}>&#8681;</span>
              <p style={{ color: "red" }}>{stock.stockCurrentPrice.ratio}</p>
            </>
          ) : (
            <>
              <span style={{ color: "green" }}>&#8679;</span>
              <p style={{ color: "green" }}>{stock.stockCurrentPrice.ratio}</p>
            </>
          )}
        </div>
        <p>{onlyTwoNums(stock.stockCurrentPrice.price)}$</p>
      </div>
    </div>
  );
};

export default StockInfo;
