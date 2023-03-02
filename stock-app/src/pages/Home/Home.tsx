import React, { FC } from "react";
import "./home.css";
import Marquee from "../../components/Marquee/Marquee";
import News from "../../components/News/News";

const Home: FC = ({}) => {
  return (
    <div className="HomeContainer">
      <div className="Header">
        <div className="left">
          <p>Leading Website For</p>
          <p>Stock Market Trading</p>
          <span
            className="btnOrange"
            onClick={() => console.log("start trade!")}
          >
            Start Trade
          </span>
        </div>
      </div>
      <Marquee />
      <div className="newsSection">
        <News />
        <div className="graph"></div>
      </div>
    </div>
  );
};

export default Home;
