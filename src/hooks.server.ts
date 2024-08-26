import { error, type Handle, type HandleFetch } from '@sveltejs/kit';
import setCookie from 'set-cookie-parser';
import type { CookieSerializeOptions } from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const isLogin = event.cookies.get('isLogin');
	event.locals.isLogin = isLogin === 'true';

	return resolve(event);
};

export function handleError({ error, status }) {
	// I. 에러 출력
	console.error('Error occurred:', error);

	// I. error.svelte 로 넘어감
	if (status === 404) return { message: 'Page Not Found' };
	return { message: (error as Error).message };
}

// request : Sveltekit(서버), fetch 요청 시 request
// event.request : 클라이언트(브라우저) raw Request => 클라이언트의 요청임
// 순서 : form actions 에서 fetch => handleFetch 에서 요청을 잡아서 가공 후 fetch => form actions 에서 받음
export const handleFetch: HandleFetch = async ({ fetch, request, event }) => {
	// I. 요청 시 브라우저에 있는 쿠키 담기
	request.headers.set('cookie', event.request.headers.get('cookie') ?? ''); // 와 이게 MAGIC 이지...

	// I. 응답 시 브라우저에 쿠키 담기
	const response = await fetch(request);
	const parseCookies = setCookie(response.headers.getSetCookie());
	parseCookies.forEach(({
													name,
													value,
													...options
												}) => event.cookies.set(name, value, options as CookieSerializeOptions & { path: string }));

	return response;
};