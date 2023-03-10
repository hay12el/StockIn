import React, { FC } from "react";
import "./icons.css";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

interface IconsProps {}

const Icons: FC<IconsProps> = ({}) => {
  return (
    <div className="wr">
      <a href="#" id="iconn">
        <FaFacebook size={20} />
        <span>Facebook</span>
      </a>
      <a href="#" id="iconn">
        <FaTwitter size={20} />
        <span>Twitter</span>
      </a>
      <a href="#" id="iconn">
        <AiFillInstagram size={20} />
        <span>Instagram</span>
      </a>
      <a href="#" id="iconn">
        <FaGithub size={20} />
        <span>Github</span>
      </a>
    </div>
  );
};

export default Icons;
