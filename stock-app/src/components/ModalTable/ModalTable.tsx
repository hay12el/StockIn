import axios from "axios";
import React, { FC, useRef, useState } from "react";
import { useAppSelector } from "../../redux/Store";
import "../MyModal/MyModal.css";
import { IWallet } from "../StocksTable/StocksTable";
import { IStock } from "../StockInfo/StockInfo";

export interface ISellStock {
  show: boolean;
  stock: IStock | undefined;
  setDetailsForModal: React.Dispatch<React.SetStateAction<undefined>>;
  setModalShow: (x: boolean) => void;
  onHide: (x: boolean) => void;
}

const ModalTable: FC<ISellStock> = ({ show, stock, onHide, setDetailsForModal,setModalShow }) => {
  const setModelInfo = (price: number, numOfStocks: number) => {
    setDetailsForModal({
      //@ts-ignore
      stockName: stock.stockName,
      //@ts-ignore
      stockPrice: price,
      numOfStocks: numOfStocks,
      //@ts-ignore
      stockCurrentPrice: stock.stockCurrentPrice,
    });
    setModalShow(true);
  };
  return (
    <div className="ModalContainer" style={show ? { display: "flex" } : {}}>
      <div className="ModalBox">
        <div className="topModel">
          <div className="upx" onClick={() => onHide(false)}>
            <h1>X</h1>
          </div>
          <h1>{stock && stock.stockName}</h1>
        </div>
        <div className="content">
          <div className="col">
            <table className="table-fill">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Actios</th>
                </tr>
              </thead>
              <tbody className="table-hover">
                {stock?.priceAndAmount.map((pna: any) => (
                  <tr key={`${pna[2]}${pna[1]}${pna[0]}`}>
                    <td className="text-left">
                      {pna[2].split("T")[0]}{" "}
                      {pna[2].split("T")[1].split(".")[0]}
                    </td>
                    <td className="text-left">{pna[0]}</td>
                    <td className="text-left">{pna[1]}$</td>
                    <td className="text-left">
                      <button onClick={() => setModelInfo(pna[1], pna[0])}>
                        sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bottuns">
          <button
            className="bottunWithAnim"
            id="close"
            onClick={() => onHide(false)}
          >
            <span className="span-mother">
              <span>C</span>
              <span>L</span>
              <span>O</span>
              <span>S</span>
              <span>E</span>
            </span>
            <span className="span-mother2">
              <span>C</span>
              <span>L</span>
              <span>O</span>
              <span>S</span>
              <span>E</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTable;
