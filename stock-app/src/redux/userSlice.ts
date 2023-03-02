import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface user {
  token: string;
  name: string;
}

const initialState: user = {
  token: localStorage.getItem("token") || "",
  name: localStorage.getItem("name") || "",
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
  },
});


export default userSlice.reducer;
export const {LOGIN, LOGOUT} = userSlice.actions;
