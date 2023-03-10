import React, { FC, useEffect, useRef, useState } from "react";
import "./sab.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { SetLoading } from "../../redux/userSlice";
import { onlyTwoNums } from "../../components/StocksTable/StocksTable";

interface IResult {
  price: string;
  symbol: string;
}

const SearchAndBuy: FC = ({}) => {
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(1);
  const stockName = useRef("");
  const [results, setResults] = useState<IResult>({ price: "", symbol: "" });
  const dispatch = useAppDispatch();

  const handleEnterClick = (e: any) => {
    if (e.key === "Enter") {
      search();
    }
  };
  const search = async () => {
    try {
      dispatch(SetLoading({ loading: true }));
      const data = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/news/getStockData/?sym=${stockName.current}`
      );
      console.log(stockName.current);
      setResults(data.data.stockData);
      dispatch(SetLoading({ loading: false }));
    } catch (err) {
      console.log(err);
      dispatch(SetLoading({ loading: false }));
    }
  };

  const buy = async () => {
    try {
      dispatch(SetLoading({ loading: true }));
      const data = await axios.post(
        `http://localhost:${process.env.REACT_APP_URL}/wallet/addStocks`,
        {
          stockName: results.symbol,
          amounts: count,
          stockPrice: results.price,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );
      console.log(data.data);

      dispatch(SetLoading({ loading: false }));
    } catch (err) {
      dispatch(SetLoading({ loading: false }));
      console.log(err);
    }
  };

  const handleChane = (e: any) => {
    stockName.current = e.target.value;
  };

  const openDown = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleRangeChange = (e: any) => {
    //@ts-ignore
    setCount(e.target.value);
  };

  return (
    <div className="searchWrapper">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Enter Stock Name"
          onKeyDown={handleEnterClick}
          onChange={handleChane}
        />
        <button type="submit" className="searchButton" onClick={search}>
          <BsSearch />
        </button>
      </div>

      {results.symbol ? (
        <div className="searchResults" style={open ? { height: "200px" } : {}}>
          <div className="uupp">
            <label htmlFor="check" className="bar">
              <input id="check" type="checkbox" onClick={openDown} />

              <span className="top"></span>
              <span className="middle"></span>
              <span className="bottom"></span>
            </label>
          </div>

          <div className="upBuy">
            <p>{results.symbol}</p>
            <p>{onlyTwoNums(results.price)}</p>
          </div>

          <div className="downTheBuy">
            <p>
              i want to buy <b>{count}</b> {results.symbol} stocks
            </p>
            <input
              type={"range"}
              min={1}
              max={10}
              onChange={handleRangeChange}
            />
            <div className="btnsec">
              <button className="bottunWithAnim" onClick={buy}>
                <span className="span-mother">
                  <span>B</span>
                  <span>U</span>
                  <span>Y</span>
                </span>
                <span className="span-mother2">
                  <span>B</span>
                  <span>U</span>
                  <span>Y</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchAndBuy;
