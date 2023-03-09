import React, { FC, useState, useEffect } from "react";
import "./StocksTable.css";
import StockInfo from "../StockInfo/StockInfo";
import { useAppSelector, useAppDispatch } from "../../redux/Store";
import axios from "axios";
import { IStock } from "../StockInfo/StockInfo";
import MyModal from "../MyModal/MyModal";
import ModalTable from "../ModalTable/ModalTable";
import { SetLoading } from "../../redux/userSlice";
import Message from "../Message/Message";

export interface IWallet {
  user: string;
  total?: number;
  stocks?: [];
}

export function onlyTwoNums(num: number | string | undefined): string {
  if(typeof(num) == "number"){
    return num.toFixed(2)
  }else{
    //@ts-ignore
    return parseFloat(num).toFixed(2)
  }
}

const StocksTable: FC = ({}) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IWallet | undefined>();
  const [stocks, setStocks] = useState<[] | undefined>();
  const [modalShow, setModalShow] = useState(false);
  const [modalTableShow, setModalTableShow] = useState(false);
  const [detailsForModal, setDetailsForModal] = useState();
  const [stockForTable, setStockForTable] = useState<IStock | undefined>();
  const [wobble, setWobble] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    dispatch(SetLoading({loading:true}))
    
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/wallet/getWalletById`,
        { headers: { token: user.token } }
        );
        setData(res.data.wallet);
        setStocks(res.data.wallet.stocks); 
        dispatch(SetLoading({loading:false}))
      };
      getData();
    }, []);

  return (
    <div className="TContainer">
      <Message profit={message} wobble={wobble} setWobble={setWobble}/>
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
        setModalTableShow={setModalTableShow}
        setStocks={setStocks}
        setData={setData}
        setWobble={setWobble}
        setMessage={setMessage}
      />
     {data && <>
      <div className="walletSum">
        <div className="totalSum">
          <p>Total Money In Your Wallet</p>
          <h1>{onlyTwoNums(data?.total)}$</h1>
        </div>
      </div>
      <h1>Your stocks:</h1>
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
     </>}
    </div>
  );
};

export default StocksTable;
