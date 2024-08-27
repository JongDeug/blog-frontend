import cookieParser from 'set-cookie-parser';
import type { CookieSerializeOptions } from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';

export const setCookie = (event: RequestEvent<Partial<Record<string, string>>, string | null>, response: Response) => {
	// I. 응답 시 브라우저에 쿠키 담기
	const parseCookies = cookieParser(response.headers.getSetCookie());
	parseCookies.forEach(({
													name,
													value,
													...options
												}) => event.cookies.set(name, value, options as CookieSerializeOptions & { path: string }));
};