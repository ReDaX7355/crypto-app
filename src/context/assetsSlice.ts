import { createSlice } from "@reduxjs/toolkit";
import IAssets from "../types/IAssets";

interface AssetsState {
  loading: string;
  data: IAssets[];
}

const initialState: AssetsState = {
  loading: "idle",
  data: [],
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    assetsLoading: (state) => {
      if (state.loading == "idle") {
        state.loading = "pending";
      }
    },
    assetsRecived: (state, action) => {
      if (state.loading == "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    },
  },
});

export const { assetsLoading, assetsRecived } = assetsSlice.actions;

export default assetsSlice.reducer;
