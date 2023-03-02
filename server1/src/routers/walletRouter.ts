import { Router } from "express";
import { GetAmountById, addStock, saleStock, getStocksById } from "../controllers/walletController";
import verifyToken from '../middleware/authMW'

const router = Router();

router.get('/getAmoutById', verifyToken.verifyToken ,GetAmountById);

router.get('/getWalletById', verifyToken.verifyToken ,getStocksById);

router.post('/addStocks', verifyToken.verifyToken ,addStock);

router.post('/saleStock', verifyToken.verifyToken ,saleStock);

export default router;