import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ICrypto from '../types/ICrypto'
import IAssets from '../types/IAssets'

interface DataState {
  crypto: ICrypto[]
  assets: IAssets[]
}

const initialState: DataState = {
  crypto: [],
  assets: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadCrypto: (state, action: PayloadAction<ICrypto[]>) => {
      state.crypto = action.payload
    },
    loadAssets: (state, action: PayloadAction<IAssets[]>) => {
      state.assets = action.payload
    },
  },
})

export const { loadCrypto, loadAssets } = dataSlice.actions

export default dataSlice.reducer