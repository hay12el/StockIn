import React, { FC } from "react";
import { useAppSelector } from "../../redux/Store";
import "./loader.css";

const Loader: FC = () => {
  const user = useAppSelector((state) => state.user);
  
  return (
    <div className="loaderCont" style={user.loading ? {} : {display: 'none'}}>
    {/* <div className="loaderCont"> */}
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default Loader;
