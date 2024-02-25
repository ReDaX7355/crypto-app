export function getPercentFromTwoNumbers(num1: number, num2: number) {
  return +(100 * Math.abs((num1 - num2) / ((num1 + num2) / 2))).toFixed(2);
}

export function capitilize(str: string){
  return str.charAt(0).toUpperCase() + str.substring(1)
}