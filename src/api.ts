import { cryptoData } from './data';

export const fakeFetchCryptoData = () => {
  return new Promise((resolve) => setTimeout(() => resolve(cryptoData), 2000));
}

// export const fetchAssets = () => {
//   return new Promise((resolve) => setTimeout(() => resolve(cryptoData), 2000));
// }