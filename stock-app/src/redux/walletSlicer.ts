import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface wallet {
  total?: number | undefined | string;
  stocks?: [number]; 
}

const initialState: wallet = {
  total: localStorage.getItem("total") || 0,
  stocks: [0],
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<{ total: string | number; stocks: [number] }>) => {
      state.total = action.payload.total;
      state.stocks = action.payload.stocks;
    },
    LOGOUT: (state, action: PayloadAction<{}>) => {
      state.total = 0;
      state.stocks = [0];
      localStorage.clear();
    },
  },
});

export default walletSlice.reducer;
export const { LOGIN, LOGOUT } = walletSlice.actions;
