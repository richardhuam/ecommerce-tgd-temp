import { Request, Response } from 'express';

export type IRequestAndResponse = {
	req: Request;
	res: Response;
};

export type IQueryParameters = {
	page?: string;
	limit?: string;
	sort?: string;
	filter?: string;
};
