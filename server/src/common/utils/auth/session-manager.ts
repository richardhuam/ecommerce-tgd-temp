import { ACCESS_TOKEN_COOKIE_NAME, LOGGED_IN_COOKIE_NAME } from '@common/constants';
import { ILoggedIn, ITokenPayload, IUser } from '@common/models';
import { envConfig } from '@config/environment';
import { Response, Request } from 'express';

export function getLoggedInPayload(user: IUser) {
	return {
		_id: user['_id'],
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		status: user.status,
		role: user.role,
	} as ILoggedIn;
}

export function getTokenPayload(user: IUser) {
	return {
		id: user['_id'],
		role: user.role,
	} as ITokenPayload;
}

export function setAccessTokenCookie(token: string, req: Request, res: Response) {
	// Delete the previous ACCESS_TOKEN_COOKIE_NAME cookie
	//res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
	// Set and return ACCESS_TOKEN_COOKIE_NAME cookie

	return res.cookie(ACCESS_TOKEN_COOKIE_NAME, token, {
		expires: new Date(Date.now() + 1000 * 86400 * 7),
		httpOnly: true,
		//sameSite: 'lax',
		//secure: true,
		//domain: req.hostname,
	});
}

export function setLoggedInCookie(user: IUser, req: Request, res: Response) {
	// Delete the previous LOGGED_IN_COOKIE_NAME cookie
	//res.clearCookie(LOGGED_IN_COOKIE_NAME);
	// Set and return LOGGED_IN_COOKIE_NAME cookie
	return res.cookie(LOGGED_IN_COOKIE_NAME, JSON.stringify(getLoggedInPayload(user)), {
		expires: new Date(Date.now() + 1000 * 86400 * 7),
		httpOnly: true,
		//sameSite: 'lax',
		//secure: true,
		//domain: req.hostname,
	});
}
