import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ICrypto from '../types/ICrypto';
import { fetchCryptoData } from '../api';

interface CryptoState {
  loading: string;
  data: ICrypto[];
}

const initialState: CryptoState = {
  loading: 'idle',
  data: [],
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCrypto.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(loadCrypto.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.data = action.payload;
          state.loading = 'idle';
        }
      });
  },
});

export const loadCrypto = createAsyncThunk('crypto/loadCrypto', async () => {
  const response = await fetchCryptoData();
  const data = await response.json();
  return data.result;
});

export default cryptoSlice.reducer;
