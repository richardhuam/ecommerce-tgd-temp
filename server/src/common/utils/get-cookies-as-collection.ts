export const getCookiesAsCollection = function (rawCookie: string): Record<string, string> {
	const cookies: Record<string, string> = {};
	rawCookie?.split(';').forEach(function (cookie: string) {
		const parts: RegExpMatchArray | null = cookie.match(/(.*?)=(.*)$/);
		if (parts?.length) {
			cookies[parts[1].trim()] = (parts[2] || '').trim();
		}
	});
	return cookies;
};
