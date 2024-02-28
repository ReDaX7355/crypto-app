import { cryptoAssets, cryptoData } from "./data";
import IAssets from "./types/IAssets";
import ICrypto from "./types/ICrypto";

export const fakeFetchCryptoData = (): Promise<ICrypto[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(cryptoData), 2000));
};

export const fetchAssets = (): Promise<IAssets[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(cryptoAssets), 4000)
  );
};
