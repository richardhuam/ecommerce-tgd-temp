export interface IHttpExceptionResponse {
	statusCode: number;
	error: string;
	message?: string[];
}

export interface ICustomHttpExceptionResponse extends IHttpExceptionResponse {
	path: string;
	dtoErrors: string[];
	method: string;
	timeStamp: Date;
}
