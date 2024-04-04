export const formatNumberWithComma = (value: string, decimal: number) => {
  if (value === undefined || value === "" || !/^\d+$/.test(value)) return "";

  while (value.length < decimal) {
    value = "0" + value;
  }

  const integerPart = parseInt(value.slice(0, -decimal), 10);
  let decimalPart = value.slice(-decimal);
  decimalPart = decimalPart.replace(/0+$/, '');

  if (isNaN(integerPart) || integerPart === 0) {
    if (decimalPart.length > 0) {
      return `0.${decimalPart}`;
    } else {
      return "0";
    }
  }

  const formattedIntegerPart = integerPart.toLocaleString();
  if (decimalPart.length > 0) {
    return `${formattedIntegerPart}.${decimalPart}`;
  } else {
    return formattedIntegerPart;
  }
};

export const adjustValueByDecimal = (value: string | number, decimal: number) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const adjustedValue = numericValue * Math.pow(10, decimal);
  
  return Math.round(adjustedValue).toString();
}