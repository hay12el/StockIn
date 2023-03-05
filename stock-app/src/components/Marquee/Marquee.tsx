import React, { FC, useEffect, useState } from "react";
import "./marquee.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { log } from "console";

interface MarqueeProps {}

type IStock = {
  symbol: string;
  price: string;
};

const Marquee: FC<MarqueeProps> = ({}) => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<IStock[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/news/getStocksData`
      );
      setStocks(data.data.stocksData);
    };
    getData();
  }, []);

  const hundleClick = (s: string) => {
    navigate(`/Stock/${s}`);
    console.log(s);
  };

  return (
    <div className="Marquee">
      <div className="Marquee-content">
        {stocks &&
          stocks.map((stock) => {
            return (
              <div
                className="Marquee-tag"
                key={stock.symbol}
                onClick={() => hundleClick(stock.symbol)}
              >
                <h2>
                  <b>{stock.symbol}</b>
                </h2>{" "}
                <h4>{parseFloat(stock.price).toFixed(2)}</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Marquee;
