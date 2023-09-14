export function formatNumberWithLeadingZeros(number: number, desiredLength: number) {
  return String(number).padStart(desiredLength, '0');
}
