import { randomBytes } from 'crypto';

export function createProductCategoryCode(categoryName: string) {
	return `${categoryName.substr(0, 3).toUpperCase()}${randomBytes(3).toString('hex').toUpperCase()}`;
}
