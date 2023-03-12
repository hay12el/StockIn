import React, { FC, useEffect, useRef, useState } from "react";
import "./sab.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { SetLoading } from "../../redux/userSlice";
import { onlyTwoNums } from "../../components/StocksTable/StocksTable";

interface IResult {
  price: { ratio: string; price: number };
  symbol: string;
}

const SearchAndBuy: FC = ({}) => {
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(1);
  const stockName = useRef("");
  const [results, setResults] = useState<IResult>({
    price: { ratio: "", price: 0 },
    symbol: "",
  });
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
          stockName: results.symbol.toUpperCase(),
          amounts: count,
          stockPrice: results.price.price,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );

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
          style={{ textTransform: "uppercase" }}
        />
        <button type="submit" className="searchButton" onClick={search}>
          <BsSearch />
        </button>
      </div>

      {results.price.price != 0 ? (
        <div className="card">
          <div className="title">
            <span>
              <svg
                width="20"
                fill="currentColor"
                height="20"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
              </svg>
            </span>
            <p className="title-text">{results.symbol.toUpperCase()}</p>
            <p className="percent">
              {results.price.ratio.charAt(1) === "−" ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    fill="red"
                    height="20"
                    width="20"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
                  </svg>{" "}
                  <p style={{ color: "red", margin: "0px" }}>
                    {results.price.ratio}
                  </p>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
                  </svg>{" "}
                  <p style={{ color: "green", margin: "0px" }}>
                    {results.price.ratio}
                  </p>
                </>
              )}
            </p>
          </div>
          <div className="data">
            <p>{results.price.price}$</p>
            <h5>
              i want to buy <b>{count}</b> {results.symbol} stocks
            </h5>
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

{
  /* <div className="uupp">
            <label htmlFor="check" className="bar">
              <input id="check" type="checkbox" onClick={openDown} />

              <span className="top"></span>
              <span className="middle"></span>
              <span className="bottom"></span>
            </label>
          </div> */
}
