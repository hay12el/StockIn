import { Request, Response } from "express";
import Wallet, { IWallet } from "../models/Wallet";
import { getStockDataFunc } from "../routers/newsRouter";

const GetAmountById = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const amount: IWallet | null = await Wallet.findOne({ user: userId });
    res.status(200).json({ total: amount?.total });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getStocksById = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId: string | null = req.userId;

    const amount: IWallet | null = await Wallet.findOne({ user: userId });

    const stocks = await Promise.all(
      //@ts-ignore
      amount?.stocks?.map(async (stock, index) =>
        getStockDataFunc(
          //@ts-ignore
          stock.stockName, amount, index
        )
      )
    );

    console.log(stocks.map((s:any)=> s.data["Global Quote"]["05. price"]));
    
    let index = 0;
    //@ts-ignore
    for (const item of amount?.stocks) {
      
      //@ts-ignore
      amount?.stocks[index].stockCurrentPrice = stocks[index].data["Global Quote"]["05. price"];
      index++;
      // console.log(index);
    }
    
    // for (const item of amount?.stocks) {
    //   const data = await getStockDataFunc(
    //     //@ts-ignore
    //     item.stockName
    //   );
    //   //@ts-ignore
    //   amount?.stocks[index].stockCurrentPrice =
    //     data?.data["Global Quote"]["05. price"];
    //   index++;
    //   console.log(index);

    // }
    // console.log("finish loop");

    //@ts-ignore
    res.status(200).send({ wallet: amount });
    // res.sendStatus(200);
  } catch (err) {
    res.status(404);
  }
};

const addStock = async (req: Request, res: Response) => {
  // gets json with stock name, stock price, amount of stocks the user wants to buy.
  // check if the user has enough money to buy that amount of stocks, else send status 404 and appropriate message.
  try {
    const { stockPrice, amounts, stockName } = req.body;

    //@ts-ignore
    const userId = req.userId;
    const amount: IWallet | null = await Wallet.findOne({ user: userId });
    const totalPriceOfStocks = Number(stockPrice) * Number(amounts);
    // @ts-ignore
    if (totalPriceOfStocks > amount?.total) throw new Error("not enough money");

    var newObj = {
      stockName: stockName,
      priceAndAmount: [[amounts, stockPrice, new Date()]],
    };

    if (amount?.stocks?.length == 0) {
      await Wallet.findOneAndUpdate({ user: userId }, { stocks: [newObj] });
    } else {
      let i = 0;
      let newArr = [];
      //@ts-ignore
      for (i; i < amount.stocks.length; i++) {
        //@ts-ignore
        if (amount.stocks[i].stockName == stockName) {
          //@ts-ignore
          newArr = amount.stocks[i].priceAndAmount;
          //@ts-ignore
          newArr.push([amounts, stockPrice, new Date()]);
          break;
        }
      }
      if (newArr.length != 0) {
        await Wallet.findOneAndUpdate(
          { user: userId },
          {
            $set: {
              //@ts-ignore
              "stocks.$[elemX].priceAndAmount": newArr,
            },
          },
          {
            arrayFilters: [
              {
                "elemX.stockName": stockName,
              },
            ],
          }
        );
      } else {
        await Wallet.findOneAndUpdate(
          { user: userId },
          { $push: { stocks: newObj } }
        );
      }
    }
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      // @ts-ignore
      { total: amount?.total - totalPriceOfStocks },
      { new: true }
    );
    res.status(200).send(wallet);
  } catch (err) {
    res.status(404).send({ message: err });
  }
};

const saleStock = async (req: Request, res: Response) => {
  const { stockPrice, stockName, amounts, numOfStocks, stockCurrentPrice } =
    req.body;

  let i = 0;
  try {
    //@ts-ignore
    const userId = req.userId;

    const wallet: IWallet | null = await Wallet.findOne({ user: userId });
    let tempStocks = wallet?.stocks;

    //@ts-ignore
    for (i; i < tempStocks.length; i++) {
      //@ts-ignore
      if (tempStocks[i].stockName == stockName) {
        //@ts-ignore
        for (let j = 0; j < tempStocks[i].priceAndAmount.length; j++) {
          if (
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][0] == numOfStocks &&
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][1] == stockPrice
          ) {
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][0] =
              //@ts-ignore
              tempStocks[i].priceAndAmount[j][0] - amounts;
            //@ts-ignore
            break;
          }
        }
        break;
      }
    }
    //@ts-ignore
    let newPriceAndAmout = tempStocks[i].priceAndAmount.filter(
      //@ts-ignore
      (s) => s[0] != 0
    );

    await Wallet.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          "stocks.$[elemX].priceAndAmount": newPriceAndAmout,
          //@ts-ignore
          total: wallet?.total + amounts * stockCurrentPrice,
        },
      },
      {
        arrayFilters: [
          {
            "elemX.stockName": stockName,
          },
        ],
      }
    );

    const amount: IWallet | null = await Wallet.findOne({ user: userId });
    let index = 0;
    //@ts-ignore
    for (const item of amount?.stocks) {
      const data = await getStockDataFunc(
        //@ts-ignore
        item.stockName
      );
      //@ts-ignore
      amount?.stocks[index].stockCurrentPrice =
        data?.data["Global Quote"]["05. price"];
      index++;
    }
    res.status(200).send({ wallet: amount });
  } catch (err) {
    console.log(err);

    res.status(404).send(err);
  }
};

export { GetAmountById, addStock, saleStock, getStocksById };
