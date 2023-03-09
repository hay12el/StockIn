import React, { FC } from "react";
import "./message.css";
import { onlyTwoNums } from "../StocksTable/StocksTable";

interface MessageProps {
  profit: number | string | undefined;
  wobble: string | number;
  setWobble: React.Dispatch<React.SetStateAction<number>>;
}

const Message: FC<MessageProps> = ({ profit, wobble, setWobble }) => {
  return (
    //@ts-ignore
    <div className="MsgC" wobble={wobble} onAnimationEnd={() => setWobble(0)}>
      {/* <div className="firework"></div> */}
      <div className="msg">
        <h3>Great!</h3>
        <p>{`you made a profit of ${onlyTwoNums(profit)} dollars`}</p>
      </div>
    </div>
  );
};

export default Message;
