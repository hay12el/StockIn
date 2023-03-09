import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {useEffect} from 'react'

export interface user {
  token: string;
  name: string;
  loading: boolean;
}

const initialState: user = {
  token: localStorage.getItem("token") || "",
  name: localStorage.getItem("name") || "",
  loading: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action:PayloadAction<{ name: string, token: string }>) => {
        state.name = action.payload.name;
        state.token = action.payload.token;
    },
    LOGOUT: (state, action:PayloadAction<{}>) => {
        state.token= "";
        state.name= "";
        localStorage.clear();
    },
    SetLoading: (state, action:PayloadAction<{ loading: boolean}>) => {
        state.loading=action.payload.loading;
    }
  },
});

export default userSlice.reducer;
export const {LOGIN, LOGOUT, SetLoading} = userSlice.actions;
