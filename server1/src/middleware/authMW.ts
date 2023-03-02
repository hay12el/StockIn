import { Request, Response, NextFunction } from "express";
import jwt , { Secret, JwtPayload } from 'jsonwebtoken';

const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    //@ts-ignore
    const token = req.headers['token'];
    try{
        if(token){
            //@ts-ignore
            const jwtRes = jwt.verify(token, process.env.secretKey)
            //@ts-ignore
            req.userId = jwtRes._id;
            next();
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(err) {
        console.log(err);
        res.sendStatus(401);
    }
}

export default {verifyToken};