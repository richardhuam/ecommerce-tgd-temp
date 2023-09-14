export function calculateRatingAverage(numbers: number[], step: number): string {
  if (numbers.length === 0) return '0.0';

  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const rawAverage = sum / numbers.length;
  const roundedAverage = Math.round(rawAverage / step) * step;

  // Convert the rounded average to a string in the format "x.y"
  const [integerPart, fractionalPart] = roundedAverage.toString().split('.');
  const formattedAverage = `${integerPart}.${fractionalPart || '0'}`;

  return formattedAverage;
}
