import { v4 as uuidv4 } from 'uuid';
import { FieldType } from './types/FieldType';
import ICrypto from './types/ICrypto';

export function getPercentFromTwoNumbers(num1: number, num2: number) {
  return +(100 * Math.abs((num1 - num2) / ((num1 + num2) / 2))).toFixed(2);
}
export function transformNewAsset(
  assetForm: FieldType,
  targetCoin: ICrypto | undefined
) {
  return {
    id: uuidv4(),
    id_coin: targetCoin?.id,
    name: targetCoin?.name,
    amount: assetForm.amount,
    price: assetForm.price,
    totalAmount: assetForm.total && +assetForm.total,
    date: assetForm?.datetime
      ? new Date(assetForm.datetime).toLocaleString()
      : new Date().toLocaleString(),
    grow: targetCoin?.price && +assetForm.price < targetCoin.price,
    growPercent: targetCoin?.price
      ? getPercentFromTwoNumbers(assetForm.price, targetCoin.price)
      : undefined,
    totalProfit: targetCoin?.price
      ? assetForm.amount * targetCoin.price - assetForm.amount * assetForm.price
      : undefined,
  };
}
