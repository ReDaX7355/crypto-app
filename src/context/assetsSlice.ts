import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import IAssets from '../types/IAssets';
import { fetchAssets } from '../api';
interface AssetsState {
  loading: string;
  data: IAssets[];
}

const initialState: AssetsState = {
  loading: 'idle',
  data: [],
};

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAsset: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem('assets', JSON.stringify(state.data));
    },
    deleteAsset: (state, action) => {
      state.data = state.data.filter((item) => item.id != action.payload);
      if (state.data.length < 1) {
        localStorage.removeItem('assets');
      } else {
        localStorage.setItem('assets', JSON.stringify(state.data));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssets.pending, (state) => {
        if (state.loading == 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(loadAssets.fulfilled, (state, action) => {
        if (state.loading == 'pending') {
          state.data = action.payload;
          state.loading = 'idle';
        }
      });
  },
});

export const loadAssets = createAsyncThunk('assets/loadAssets', async () => {
  const response = await fetchAssets();
  return response;
});

export const { addAsset, deleteAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
