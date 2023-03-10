import React, { FC } from "react";
import "./home.css";
import Marquee from "../../components/Marquee/Marquee";
import News from "../../components/News/News";
import Charts from "../../components/Charts/Charts";
import { useNavigate } from "react-router-dom";

const Home: FC = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="HomeContainer">
      <div className="Header">
        <div className="left">
          <p>Leading Website For</p>
          <p>Stock Market Trading</p>
          <span className="btnOrange" onClick={() => navigate("/SearchAndBuy")}>
            Start Trade
          </span>
        </div>
      </div>
      <Marquee />
      <div className="newsSection">
        <News />
        <div className="graph">
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default Home;
