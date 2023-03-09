import axios from "axios";
import React, { FC, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/Store";
import "./MyModal.css";
import { IWallet } from "../StocksTable/StocksTable";
import { SetLoading } from "../../redux/userSlice";
import { onlyTwoNums } from "../StocksTable/StocksTable";

export interface ISellStock {
  show: boolean;
  stockName: string | undefined;
  stockPrice: string | undefined;
  numOfStocks: number;
  stockCurrentPrice: string;
  setStocks: React.Dispatch<React.SetStateAction<[] | undefined>>;
  setData: React.Dispatch<React.SetStateAction<IWallet | undefined>>;
  setModalTableShow: React.Dispatch<React.SetStateAction<boolean>>;
  setWobble: React.Dispatch<React.SetStateAction<number>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onHide: (x: boolean) => void;
}

const MyModal: FC<ISellStock> = ({
  show,
  stockName,
  stockPrice,
  numOfStocks,
  stockCurrentPrice,
  setStocks,
  setData,
  setModalTableShow,
  setWobble,
  onHide,
  setMessage,
}) => {
  const [count, setCount] = useState<number>(1);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleRangeChange = (e: any) => {
    //@ts-ignore
    setCount(e.target.value);
  };

  const sell = async () => {
    try {
      dispatch(SetLoading({ loading: true }));
      const newWallet = await axios.post(
        "http://localhost:4000/wallet/saleStock",
        {
          stockName: stockName,
          amounts: count,
          stockPrice: stockPrice,
          numOfStocks: numOfStocks,
          stockCurrentPrice,
        },
        { headers: { token: user.token } }
      );
      //@ts-ignore
      setData(newWallet.data.wallet);
      //@ts-ignore
      setStocks(newWallet.data.wallet.stocks);
      onHide(false);
      setModalTableShow(false);
      dispatch(SetLoading({ loading: false }));
      //@ts-ignore
      setMessage(stockPrice * count - stockCurrentPrice * count);
      setWobble(1);
    } catch (err: any) {
      onHide(false);
      setModalTableShow(false);
      dispatch(SetLoading({ loading: false }));
      console.log(err);
    }
  };

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
            <p>
              you have bought {numOfStocks} {stockName} stocks at a price{" "}
              {stockPrice}$ current price {onlyTwoNums(stockCurrentPrice)}$
            </p>
          </div>
          <div className="counter">
            <div>
              I Want To Sell <b>{count}</b> Stocks
            </div>

            <input
              type={"range"}
              min={1}
              max={numOfStocks}
              onChange={handleRangeChange}
            />
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
