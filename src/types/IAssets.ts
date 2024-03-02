export default interface IAssets {
  id: string;
  name: string;
  amount: number;
  price: number;
  date: string;
  grow?: boolean;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
}
