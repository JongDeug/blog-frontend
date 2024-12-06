import cookieParser from 'set-cookie-parser';
import type { RequestEvent } from '@sveltejs/kit';

const saveJwtInCookie = (
	response: Response,
	event: RequestEvent<Partial<Record<string, string>>, string | null>
) => {
	const parseCookies = cookieParser(response.headers.getSetCookie());
	for (const cookie of parseCookies) {
		const { name, value, ...options } = cookie;
		event.cookies.set(name, value, options as any);
	}
};

export default saveJwtInCookie;
