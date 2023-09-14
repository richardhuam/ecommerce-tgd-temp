export function standardizePrice(price: string) {
  const numericValue = parseFloat(price);
  if (isNaN(numericValue)) {
    throw new Error('Invalid price format');
  }
  const standardizedPrice = numericValue.toFixed(2);
  return standardizedPrice;
}
