import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice";
import assetsSlice from "./assetsSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoSlice,
    assets: assetsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
