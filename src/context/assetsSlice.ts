import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IAssets from "../types/IAssets";
import { fetchAssets } from "../api";

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
    addAsset: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssets.pending, (state) => {
        if (state.loading == "idle") {
          state.loading = "pending";
        }
      })
      .addCase(loadAssets.fulfilled, (state, action) => {
        if (state.loading == "pending") {
          state.data = action.payload;
          state.loading = "idle";
        }
      });
  },
});

export const loadAssets = createAsyncThunk("assets/loadAssets", async () => {
  const response = await fetchAssets();
  return response;
});

export const { addAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
