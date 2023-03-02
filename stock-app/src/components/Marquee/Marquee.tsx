import React, { FC, useEffect, useState } from "react";
import "./marquee.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface MarqueeProps {}

type IStock = {
  symbol: string;
  price: string;
};

const Marquee: FC<MarqueeProps> = ({}) => {
  const navigate = useNavigate()
  const [stocks, setStocks] = useState<IStock[]>();

  useEffect(() => {
    const getStocks = async () => {
      const stockArray = await axios.get(
        `https://api.twelvedata.com/price?symbol=TWKS,IBM,AAPL,TCS,META&apikey=${process.env.REACT_APP_TDTOKEN}`
      );
      let s = Object.entries(stockArray.data).map((stock: any) => {
        return { symbol: stock[0], price: stock[1].price };
      });

      setStocks(s);
    };

    getStocks();
  }, []);

  const hundleClick = (s: string) => {
    navigate(`/Stock/${s}`)
    console.log(s);
  }

  return (
    <div className="Marquee">
      <div className="Marquee-content">
        {stocks &&
          stocks.map((stock) => {
            return (
              <div className="Marquee-tag" key={stock.symbol} onClick={() => hundleClick(stock.symbol)}>
                
                  <h2><b>{stock.symbol}</b></h2> <h4>{stock.price}</h4>
                
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Marquee;
