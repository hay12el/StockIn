import { type } from "os";
import React, { FC, useEffect, useState } from "react";
import "./StockInfo.css";
import MyModal from "../MyModal/MyModal";

export interface IStock {
  stockName: string;
  priceAndAmount: number[];
}

type props = {
  stock: IStock;
  setModalShow: (x: boolean) => void;
  setDetailsForModal: React.Dispatch<React.SetStateAction<undefined>>;
};

const StockInfo: FC<props> = ({ stock, setModalShow, setDetailsForModal }) => {
  const [open, setOpen] = useState(true);
  const [colStyleOpen, setColStyleOpen] = useState({
    animationName: "open",
    animationDuration: "0.2s",
  });
  const [colStyleClose, setColStyleClose] = useState({
    animationName: "close",
    animationDuration: "0.2s",
  });

  const setModelInfo = (price: number) => {
    setDetailsForModal({
      //@ts-ignore
      stockName: stock.stockName,
      //@ts-ignore
      stockPrice: price,
      stockCurrentPrice: "100",
    });
    setModalShow(true);
  };

  return (
    <div>
      <div className="contstock">
        <div className="lowerS">
          <p>{stock.stockName}</p>
        </div>
        <div className="lowerS">
          <p>{stock.stockName}</p>
          <p>{stock.stockName}</p>
        </div>
      </div>
      {/* <div className="clickWithInfo" onClick={() => setOpen(!open)}>
        <p>{stock.stockName}</p>
      </div>
      <div className="col" style={open ? colStyleClose : colStyleOpen}>
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
                  {pna[2].split("T")[0]} {pna[2].split("T")[1].split(".")[0]}
                </td>
                <td className="text-left">{pna[0]}</td>
                <td className="text-left">{pna[1]}$</td>
                <td className="text-left">
                  <button onClick={() => setModelInfo(pna[1])}>sell</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default StockInfo;
