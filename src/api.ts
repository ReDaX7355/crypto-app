import { v4 as uuidv4 } from "uuid";
import { cryptoAssets } from "./dataAssets";
import IAssets from "./types/IAssets";
import ICrypto from "./types/ICrypto";
import { getPercentFromTwoNumbers } from "./utils";

export const fetchCryptoData = (): Promise<Response> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "Yem3IZrcPswA1ho+s7YlEHISw/1gYyCkc0vNqIVb9F4=",
    },
  };
  return fetch("https://openapiv1.coinstats.app/coins", options);
};

export const fetchAssets = (): Promise<IAssets[]> => {
  const data = localStorage.getItem("assets");

  if (data) {
    return new Promise((resolve) => {
      setTimeout(
        async () => {
          const assets = JSON.parse(data);
          const response = await fetchCryptoData();
          const cryptoData = await response.json();
          const result = assets.map((asset: IAssets) => {
            const coin =
              cryptoData.result.find(
                (item: ICrypto) => item.id === asset.id_coin
              ) || ({} as ICrypto);
            return {
              ...asset,
              grow: asset.price < coin.price,
              growPercent: getPercentFromTwoNumbers(asset.price, coin.price),
              totalAmount: asset.amount * coin.price,
              totalProfit:
                asset.amount * coin.price - asset.amount * asset.price,
              name: asset.name ? asset.name : coin.name,
            };
          });
          resolve(result);
        },

        1000
      );
    });
  } else {
    return new Promise((resolve) =>
      setTimeout(async () => {
        const response = await fetchCryptoData();
        const cryptoData = await response.json();
        const result = cryptoAssets.map((asset) => {
          const coin =
            cryptoData.result.find(
              (item: ICrypto) => item.id === asset.id_coin
            ) || ({} as ICrypto);
          return {
            ...asset,
            id: uuidv4(),
            id_coin: coin.id,
            grow: asset.price < coin.price,
            growPercent: getPercentFromTwoNumbers(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: asset.name ? asset.name : coin.name,
          };
        });
        resolve(result);
      }, 1)
    );
  }
};
