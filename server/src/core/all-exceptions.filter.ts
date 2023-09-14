import { ICustomHttpExceptionResponse, IHttpExceptionResponse } from '@common/models';
import { NotOkResponse } from '@common/utils';
import { writeErrorLogToFile } from '@common/utils/loggers';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();

		let status: HttpStatus;
		let errorMessage: string;
		let dtoErrors: string[] = [];

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const errorResponse = exception.getResponse() as string | IHttpExceptionResponse;
			errorMessage = ((errorResponse as IHttpExceptionResponse).error || exception.message).toUpperCase().replace(/\s+/g, '_');
			dtoErrors = (errorResponse as IHttpExceptionResponse).message ?? [];
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			errorMessage = 'CRITICAL_INTERNAL_SERVER_ERROR';
		}

		const errorResponse = this.getErrorResponse(status, errorMessage, request, dtoErrors);
		const errorLog = this.getErrorLog(errorResponse, request, exception, errorMessage);
		writeErrorLogToFile(errorLog);
		//console.log(errorLog);
		response.status(status).json(NotOkResponse(errorResponse));
	}

	private getErrorResponse(status: HttpStatus, errorMessage: string, request: Request, dtoErrors: string[]): ICustomHttpExceptionResponse {
		return {
			statusCode: status,
			error: errorMessage,
			dtoErrors: dtoErrors,
			path: request.url,
			method: request.method,
			timeStamp: new Date(),
		};
	}

	private getErrorLog(errorResponse: ICustomHttpExceptionResponse, request: Request, exception: unknown, errorMessage: string): string {
		const { statusCode } = errorResponse;

		const exceptionStackTrace = (exception as HttpException).stack;
		const exceptionName = (exception as HttpException).name;
		const exceptionMessage = (exception as HttpException).message;

		const errorLog = `*********************BEGIN OF LOG*********************\n\nTimestamp: ${errorResponse.timeStamp}\nMethod: ${
			request.method
		}\nURL: ${request.url}\nStatus Code: ${statusCode}\n\n--- Request Information ---\n\nBody: ${JSON.stringify(
			request.body,
		)}\n\n--- Response Information ---\n\nDto Errors: ${JSON.stringify(errorResponse.dtoErrors)}\nUser: ${JSON.stringify(
			request.user ?? 'Not signed in',
		)}\n\n--- Error Details ---\n\nError Type: ${errorMessage}\nException: ${exceptionName}\nMessage: ${exceptionMessage}\nStack Trace: ${exceptionStackTrace}\n\n**********************END OF LOG**********************\n\n`;

		return errorLog;
	}
}
