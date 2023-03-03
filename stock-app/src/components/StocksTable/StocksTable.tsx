import React, { FC, useState, useEffect, useRef } from "react";
import "./StocksTable.css";
import StockInfo from "../StockInfo/StockInfo";
import { useAppSelector } from "../../redux/Store";
import axios from "axios";
import { IStock } from "../StockInfo/StockInfo";
import MyModal from "../MyModal/MyModal";
import { ISellStock } from "../MyModal/MyModal";

interface IWallet {
  user: string;
  total?: number;
  stocks?: [];
}

const StocksTable: FC = ({}) => {
  const user = useAppSelector((state) => state.user);
  const [data, setData] = useState<IWallet | undefined>();
  const [stocks, setStocks] = useState<[] | undefined>();
  const [modalShow, setModalShow] = useState(false);
  const [detailsForModal, setDetailsForModal] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/wallet/getWalletById`,
        { headers: { token: user.token } }
      );
      setData(res.data.wallet);
      setStocks(res.data.wallet.stocks);
      console.log(res.data.wallet.stocks);
      
    };
    getData();
  }, []);

  return (
    <div className="TContainer">
      <MyModal
        show={modalShow}
        //@ts-ignore
        stockName={detailsForModal?.stockName}
        //@ts-ignore
        stockPrice={detailsForModal?.stockPrice}
        //@ts-ignore
        numOfStocks={detailsForModal?.numOfStocks}
        stockCurrentPrice={"100"}
        onHide={() => setModalShow(false)}
      />
      <div className="walletSum">
        <div className="totalSum">
          <p>Total Money In Your Wallet</p>
          <h1>{data?.total}$</h1>
        </div>
      </div>
      <div className="boughtStocks">
        {stocks?.length &&
          stocks?.map((stock: IStock) => (
            <StockInfo
              stock={stock}
              key={stock.stockName}
              setModalShow={setModalShow}
              setDetailsForModal={setDetailsForModal}
            />
          ))}
      </div>
    </div>
  );
};

export default StocksTable;
