import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import "./news.css";
import LittleLoader from "../LittleLoader/LittleLoader";

interface IStory {
  text?: string;
  href?: string;
  img?: string;
}

const News: FC = () => {
  const [News, setNews] = useState<[IStory]>();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/news/getNews`
      );
      setNews(data.data);
    };
    getData();
  }, []);
  return (
    <div className="newsContainer">
      {News ? (
        <div className="contS">
          <h3>Top Stories</h3>
          {News?.map((element: IStory) => (
            <div className="news" key={element.href}>
              <a href={element.href} target="_blank" rel="noopener noreferrer">
                <div className="contentN">
                  <img src={element.img} alt="img" />
                  <div className="txtN">
                    <h4>{element.text}</h4>
                    <h5>from Yahoo Finance</h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <LittleLoader />
      )}
    </div>
  );
};

export default News;
