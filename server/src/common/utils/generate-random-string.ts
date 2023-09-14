import { randomBytes } from 'crypto';

export const generateRandomString = (length: number): string => {
	const bytes = randomBytes(Math.ceil(length / 2));
	return bytes.toString('hex').slice(0, length);
};
