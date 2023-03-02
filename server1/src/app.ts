import express from 'express';
import userRouter from './routers/userRouter';
import walletRouter from './routers/walletRouter';
import newsRouter from './routers/newsRouter';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import dotenv from 'dotenv';

const app:express.Application = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json()) 
app.use(cors());

//routers
app.use('/user', userRouter)
app.use('/wallet', walletRouter)
app.use('/news', newsRouter)

app.listen(process.env.port || "", () => {
    console.log("Node Is Listening");
    mongoose.connect(process.env.ATLAS_URL || "")
    .then(() => {
        console.log("Connect To Atlas");
    })
})
