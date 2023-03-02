import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Wallet from "../models/Wallet";

const LOGIN = async (req:Request, res:Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    try {
      if (!user) {
        res.sendStatus(403);
      } else {
        const comparePassword = await bcrypt.compare(req.body.password.toString(), user.password);
        if (!comparePassword) {
          res.sendStatus(404);
        } else {
          jwt.sign(
            { _id: user._id },
            process.env.secretKey || "",
            { expiresIn: "7 days" },
            (err, token) => {
              if (err) {
                res.sendStatus(403);
              } else {
                res.json({ token: token, user: user }).sendStatus(200);
              }
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(403).json({ message: err });
    }
}

const REGISTER = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const user1 = await User.find({ email: req.body.email });
        if (user1.length != 0) {
          throw new Error("Required");
        } else {
          const temp = {userName:`${firstName} ${lastName}`, email:email,password, isAdmin:false};
          temp.password = await bcrypt.hash(password.toString(), 10);
          const user = new User(temp);
          
          const wallet = new Wallet({user: user._id});
          await wallet.save();
          user.wallet = wallet._id;
          await user.save();
          
          const newToken = jwt.sign({ _id: user._id }, process.env.secretKey || "", {
            expiresIn: "7 days",
          });
          user.toJSON();
          res.status(200).send({ token: newToken, user: user });
        }
      } catch (err) {
        res.status(404).send(err);
      }
}

export {LOGIN,REGISTER}