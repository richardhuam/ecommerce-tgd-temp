import { lookup } from 'mime-types';

export const autoContentType = (filename: string) => {
	return lookup(filename) || 'application/octet-stream';
};
