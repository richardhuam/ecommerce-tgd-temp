import { generateRandomString } from './generate-random-string';

export const formatImageName = (originalName: string, prefix: string): string => {
	const extension = originalName.split('.').pop();
	const randomString = generateRandomString(8);
	return `${prefix}-${Date.now()}-${randomString}.${extension}`;
};
