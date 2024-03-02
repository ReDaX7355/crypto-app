import { cryptoAssets, cryptoData } from './data';
import IAssets from './types/IAssets';
import ICrypto from './types/ICrypto';
import { getPercentFromTwoNumbers } from './utils';

export const fakeFetchCryptoData = (): Promise<ICrypto[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(cryptoData), 2000));
};

export const fetchAssets = (): Promise<IAssets[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          cryptoAssets.map((asset) => {
            const coin =
              cryptoData.find((item) => item.id === asset.id) ||
              ({} as ICrypto);
            return {
              ...asset,
              grow: asset.price < coin.price,
              growPercent: getPercentFromTwoNumbers(asset.price, coin.price),
              totalAmount: asset.amount * coin.price,
              totalProfit:
                asset.amount * coin.price - asset.amount * asset.price,
              name: coin.name,
            };
          })
        ),
      4000
    )
  );
};
