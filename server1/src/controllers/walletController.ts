import { Request, Response } from "express";
import Wallet, { IWallet } from "../models/Wallet";

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
  try{
    //@ts-ignore
    const userId:string | null = req.userId;

    const amount: IWallet | null = await Wallet.findOne({ user: userId });
    res.status(200).send({wallet: amount});
  }catch(err){
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
    if (totalPriceOfStocks > amount?.total)
      throw new Error("not enough money")

    var newObj = {
      stockName: stockName,
      priceAndAmount: [amounts, stockPrice],
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
    res.status(404).send({message: err});
  }
};

const saleStock = async (req: Request, res: Response) => {
  const { stockPrice, stockName, amounts } = req.body;
  let amountsToChange = req.body.amounts;
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
          //@ts-ignore
          if (tempStocks[i].priceAndAmount[j][0] > amountsToChange) {
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][0] =
            //@ts-ignore
              tempStocks[i].priceAndAmount[j][0] - amountsToChange;
            break;
            //@ts-ignore
          } else if (tempStocks[i].priceAndAmount[j][0] == amountsToChange) {
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][0] = 0;
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][1] = 0;
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][2] = 0;
            break;
          } else {
            //@ts-ignore
            amountsToChange = amountsToChange - tempStocks[i].priceAndAmount[j][0];
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][0] = 0;
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][1] = 0;
            //@ts-ignore
            tempStocks[i].priceAndAmount[j][2] = 0;
          }
        }
        break;
      }
    }
    //@ts-ignore
    let newPriceAndAmout = tempStocks[i].priceAndAmount.filter((s) => s[0] != 0);

    const newWallet = await Wallet.findOneAndUpdate(
      { user: userId },
      //@ts-ignore
      {
        $set: {
          "stocks.$[elemX].priceAndAmount": newPriceAndAmout,
          //@ts-ignore
          total: wallet?.total + amounts * stockPrice,
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

    //@ts-ignore
    res.send(newWallet);
    // res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export { GetAmountById, addStock, saleStock, getStocksById };
