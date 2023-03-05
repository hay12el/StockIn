import { type } from "os";
import React, { FC, useEffect, useState } from "react";
import "./StockInfo.css";
import MyModal from "../MyModal/MyModal";

export interface IStock {
  stockName: string;
  priceAndAmount: number[];
  stockCurrentPrice: number;
}

type props = {
  stock: IStock;
  setModalShow: (x: boolean) => void;
  setStockForTable: React.Dispatch<React.SetStateAction<IStock | undefined>>;
};

const StockInfo: FC<props> = ({ stock, setModalShow, setStockForTable }) => {
  const [open, setOpen] = useState(true);
  const [colStyleOpen, setColStyleOpen] = useState({
    animationName: "open",
    animationDuration: "0.2s",
  });
  const [colStyleClose, setColStyleClose] = useState({
    animationName: "close",
    animationDuration: "0.2s",
  });

  // const setModelInfo = (price: number, numOfStocks: number) => {
  //   setDetailsForModal({
  //     //@ts-ignore
  //     stockName: stock.stockName,
  //     //@ts-ignore
  //     stockPrice: price,
  //     numOfStocks: numOfStocks,
  //     stockCurrentPrice: stock.stockCurrentPrice,
  //   });
  //   setModalShow(true);
  // };

  const setModel1Info = (stock:IStock) => {
    setStockForTable(stock);
    setModalShow(true);
  }

  return (
    <div>
      <div className="contstock" onClick={() => setModel1Info(stock)}>
        <div className="lowerS">
          <p>{stock.stockName}</p>
        </div>
        <div className="lowerS">
          <p>{stock.stockName}</p>
          <p>{stock.stockCurrentPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
