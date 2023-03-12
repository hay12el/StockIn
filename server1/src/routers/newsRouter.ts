import axios from "axios";
import cheerio from "cheerio";
import { Router, Request, Response } from "express";
import NodeCache from "node-cache";
import htmlparser2 from 'htmlparser2';

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
      //@ts-ignore
      const result = await getStockDataFuncScrap(req.query.sym);
      //@ts-ignore
      res.send({ stockData: { symbol: req.query.sym, price: result } });
    } else {
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
      console.log("inside if " + sym);
      return await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${process.env.ALPHA}`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const getStockDataFuncScrap = async (sym: string) => {
  try {
    const response = await axios.get(
      `https://www.google.com/search?q=${sym}+stock&oq=${sym}&aqs=chrome.0.69i59j69i57j5.702j0j1&sourceid=chrome&ie=UTF-8`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        },
      }
    );

    return new Promise((resolve) => {
      if (sym !== null) {
        const $ = cheerio.load(response.data);

        const price = $(
          "#knowledge-finance-wholepage__entity-summary > div.aviV4d > g-card-section > div > g-card-section > div.wGt0Bc > div.PZPZlf > span:nth-child(1) > span > span.IsqQVc.NprOob.wT3VGc"
        ).text();

        const ratio = $("#knowledge-finance-wholepage__entity-summary > div.aviV4d > g-card-section > div > g-card-section > div.wGt0Bc > div.PZPZlf > span.WlRRw.IsqQVc.fw-price-dn > span:nth-child(1)").text()
        
        const img = $("#rcnt > div.XqFnDf > div > div > div.HdbW6.MjUjnf.VM6qJ > div.hHq9Z > div > div.gyEfO.JlxBoc > div > div > div > div").find('img').attr('src')
        console.log(img);
        
        resolve({price, ratio});
      }
    });
  } catch (err) {
    console.log(err);
  }
};

router.get("/getNews", getNewsData);
router.get("/getStocksData", getStocksData);
router.get("/getStockData", getStockData);

export default router;
