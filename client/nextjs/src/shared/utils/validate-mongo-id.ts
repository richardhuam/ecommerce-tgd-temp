export function isValidObjectId(input: string): boolean {
  // ObjectId should be a 24-character hexadecimal string
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(input);
}
