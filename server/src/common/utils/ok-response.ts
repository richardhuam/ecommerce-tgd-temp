export function OkResponse<T>(payload: T) {
	return { ok: true, data: payload };
}

export function NotOkResponse<T>(payload: T) {
	return { ok: false, data: payload };
}
