import { Request, Response } from 'express';

export interface GetOrderParams {
	page: string;
	limit: string;
	req: Request;
	res: Response;
}
