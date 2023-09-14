export function formatCurrency(cents: number): string {
  const currencySymbol = '$';

  const dollars = cents / 100;
  return `${currencySymbol}${dollars.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
