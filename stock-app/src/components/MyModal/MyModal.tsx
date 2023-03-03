import React, { FC, useRef, useState } from "react";
import "./MyModal.css";

export interface ISellStock {
  show: boolean;
  stockName: string | undefined;
  stockPrice: string | undefined;
  numOfStocks: number ;
  stockCurrentPrice: string;
  onHide: (x: boolean) => void;
}

const MyModal: FC<ISellStock> = ({
  show,
  stockName,
  stockPrice,
  numOfStocks,
  stockCurrentPrice,
  onHide,
}) => {
  const ref = useRef<number>(1);
  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    if (ref.current < numOfStocks) {
      ref.current++;
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (ref.current > 1) {
      ref.current--;
      setCount(count - 1);
    }
  };

  const sell = () => {
    console.log(count);
    
    onHide(false)
  }

  return (
    <div className="ModalContainer" style={show ? { display: "flex" } : {}}>
      <div className="ModalBox">
        <div className="topModel">
          <div className="upx" onClick={() => onHide(false)}>
            <h1>X</h1>
          </div>
          <h1>{stockName}</h1>
        </div>
        <div className="content">
          <div className="contentU">
            <p>you have bought {numOfStocks} {stockName} stocks at a price </p>
            <p> {stockPrice}$</p>
          </div>
          <div className="counter">
            <button onClick={handleIncrement}>+</button>
            <div>I Want To Sell <b>{count}</b> Stocks</div>
            <button onClick={handleDecrement}>-</button>
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
          <button className="bottunWithAnim" onClick={sell}>
            <span className="span-mother">
              <span>S</span>
              <span>E</span>
              <span>L</span>
              <span>L</span>
            </span>
            <span className="span-mother2">
              <span>S</span>
              <span>E</span>
              <span>L</span>
              <span>L</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
