export function splitArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    console.error('Invalid size. Size must be greater than zero.');
    return [];
  }

  const result: T[][] = [];
  const chunks = Math.ceil(arr.length / size);

  for (let i = 0; i < chunks; i++) {
    const start = i * size;
    const end = start + size;
    result.push(arr.slice(start, end));
  }

  return result;
}
