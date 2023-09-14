export function truncateString(str: string, num: number) {
  return str
    .split('')
    .slice(0, num)
    .concat(str.length > num ? '...' : '')
    .join('');
}
