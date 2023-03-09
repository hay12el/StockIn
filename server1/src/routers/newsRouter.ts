import axios from "axios";
import cheerio from "cheerio";
import { Router, Request, Response } from "express";
import NodeCache from "node-cache";

const MyCache = new NodeCache({ stdTTL: 600 }); // deleting every 10 minutes

const router = Router();

interface IStory {
  text: string;
  href: string;
  img: string;
}

interface IStock {
  symbol: string;
  price: string;
}

const url =
  "https://finance.yahoo.com/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAALa4qVexFAjk_gdPd10lLVSSG5z4pp3MJoUYe_4psXFSw41wtghoUdvnMhjmAmaQnGiR9IKFqdSU7Y544RRXhD7U_WLE03x0MJI-4gQUCKedwRJbuWYI5rjpoJnHRmL_taiqi12ZzazBpKGegHv8aLd5NUkVRq_qxZCU7E9rLN6S";

const getNewsData = async (req: Request, res: Response) => {
  if (MyCache.has("stories")) {
    res.send(MyCache.get("stories"));
  } else {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const $el = $(
      "#Col1-0-ThreeAmigos-Proxy > div > div:nth-child(1) > div.Mstart\\(67\\%\\) > ul > li"
    );

    const stories: IStory[] = [];

    $el.map((i, el) => {
      const temp: IStory = {
        href: $(el).find("a").attr("href") || "",
        img: $(el).find("a > div > img").attr("src") || "",
        text: $(el).find("a > div > div > h3").text() || "",
      };
      stories.push(temp);
    });
    MyCache.set("stories", stories);

    res.send(stories);
  }
};

const getStocksData = async (req: Request, res: Response) => {
  const symbols = [
    "AAPL",
    "MSFT",
    "META",
    "MNDY",
    "ZIM",
    "SPOT",
    "PINS",
    "DIS",
  ];
  try {
    if (MyCache.has("stocks")) {
      res.send({ stocksData: MyCache.get("stocks") });
    } else {
      const x: IStock[] = [];
      for (const sym of symbols) {
        const stockArray = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${process.env.ALPHA}`
        );

        if (typeof stockArray.data["Global Quote"] !== "undefined") {
          x.push({
            symbol: stockArray.data["Global Quote"]["01. symbol"],
            price: stockArray.data["Global Quote"]["05. price"],
          });
        }
      }
      MyCache.set("stocks", x);
      res.send({ stocksData: x });
    }
  } catch (err) {
    console.log(err);

    res.sendStatus(404);
  }
};

const getStockData = async (req: Request, res: Response) => {
  try {
    if (req.query.sym !== null) {
      let x: IStock = { symbol: "", price: "" };
      const stockArray = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.query.sym}&apikey=${process.env.ALPHA}`
      );

      if (typeof stockArray.data["Global Quote"] !== "undefined") {
        x = {
          symbol: stockArray.data["Global Quote"]["01. symbol"],
          price: stockArray.data["Global Quote"]["05. price"],
        };
      }
      res.send({ stockData: x });
    }else{
      res.send({ stockData: "not found" });

    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

export const getStockDataFunc = async (sym: string) => {
  try {
    if (sym !== null) {
      return await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${process.env.ALPHA}`
      );
    }
  } catch (err) {
    console.log(err);
  }
}

router.get("/getNews", getNewsData);
router.get("/getStocksData", getStocksData);
router.get("/getStockData", getStockData);

export default router;
