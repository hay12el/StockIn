import React, { FC, useState, useEffect, useRef } from "react";
import "./StocksTable.css";
import StockInfo from "../StockInfo/StockInfo";
import { useAppSelector } from "../../redux/Store";
import axios from "axios";
import { IStock } from "../StockInfo/StockInfo";
import MyModal from "../MyModal/MyModal";
import { ISellStock } from "../MyModal/MyModal";
import ModalTable from "../ModalTable/ModalTable";

export interface IWallet {
  user: string;
  total?: number;
  stocks?: [];
}

const StocksTable: FC = ({}) => {
  const user = useAppSelector((state) => state.user);
  const [data, setData] = useState<IWallet | undefined>();
  const [stocks, setStocks] = useState<[] | undefined>();
  const [modalShow, setModalShow] = useState(false);
  const [modalTableShow, setModalTableShow] = useState(false);
  const [detailsForModal, setDetailsForModal] = useState();
  const [stockForTable, setStockForTable] = useState<IStock | undefined>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/wallet/getWalletById`,
        { headers: { token: user.token } }
      );
      setData(res.data.wallet);
      setStocks(res.data.wallet.stocks);
    };
    getData();
  }, []);

  return (
    <div className="TContainer">
      <ModalTable
        show={modalTableShow}
        stock={stockForTable}
        setModalShow={setModalShow}
        setDetailsForModal={setDetailsForModal}
        onHide={() => setModalTableShow(false)}
      />
      <MyModal
        show={modalShow}
        //@ts-ignore
        stockName={detailsForModal?.stockName}
        //@ts-ignore
        stockPrice={detailsForModal?.stockPrice}
        //@ts-ignore
        numOfStocks={detailsForModal?.numOfStocks}
        //@ts-ignore
        stockCurrentPrice={detailsForModal?.stockCurrentPrice}
        onHide={() => setModalShow(false)}
        setStocks={setStocks}
        setData={setData}
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
              setModalTableShow={setModalTableShow}
              setStockForTable={setStockForTable}
            />
          ))}
      </div>
    </div>
  );
};

export default StocksTable;
