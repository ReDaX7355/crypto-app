import { createSlice } from "@reduxjs/toolkit";
import ICrypto from "../types/ICrypto";

interface CryptoState {
  loading: string;
  data: ICrypto[];
}

const initialState: CryptoState = {
  loading: "idle",
  data: [],
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    cryptoLoading: (state) => {
      if (state.loading == "idle") {
        state.loading = "pending";
      }
    },
    cryptoRecived: (state, action) => {
      if (state.loading == "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    },
  },
});

export const { cryptoLoading, cryptoRecived } = cryptoSlice.actions;

export default cryptoSlice.reducer;
