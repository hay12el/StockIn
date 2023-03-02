import { userSlice } from "./userSlice";
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { useSelector } from "react-redux/es/exports";
import {walletSlice} from './walletSlicer'

export const store = configureStore({
    reducer: {
        user:userSlice.reducer,
        wallet: walletSlice.reducer
    }
})

export const useAppDispatch:()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;