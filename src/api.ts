import { cryptoAssets, cryptoData } from './data';
import IAssets from './types/IAssets';
import ICrypto from './types/ICrypto';
import { getPercentFromTwoNumbers } from './utils';

export const fetchCryptoData = (): Promise<Response> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'rZdjWNU6pFZ4upBb3PSTyqTtD+ivo/gjOMZxA7/XxdI=',
    },
  };

  return fetch('https://openapiv1.coinstats.app/coins', options);
};

export const fetchAssets = (): Promise<IAssets[]> => {
  const data = localStorage.getItem('assets');
  if (data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(JSON.parse(data)), 1000);
    });
  } else {
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
        1000
      )
    );
  }
};
