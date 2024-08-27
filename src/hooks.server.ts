import { error, type Handle, type HandleFetch } from '@sveltejs/kit';
import cookieParser from 'set-cookie-parser';
import type { CookieSerializeOptions } from 'cookie';
import { PUBLIC_API_URL } from '$env/static/public';
import { setCookie } from '$lib/utils/setCookie';

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
	let clonedRequestBody: any;

	// I. 한 번 쓰면 못쓰기 때문에 미리 body 복사 (POST, PUT, PATCH)
	if (request.method !== 'GET') {
		clonedRequestBody = await request.clone().json(); // JSON 데이터로 가정
	}

	// I. 요청 시 브라우저에 있는 쿠키 담기
	request.headers.set('cookie', event.request.headers.get('cookie') ?? ''); // 와 이게 MAGIC 이지...

	const response = await fetch(request);

	// I. 응답 시 브라우저에 쿠키 담기
	const parseCookies = cookieParser(response.headers.getSetCookie());
	parseCookies.forEach(({
													name,
													value,
													...options
												}) => event.cookies.set(name, value, options as CookieSerializeOptions & { path: string }));

	// I. 만료된 토큰 => Refresh => API 재요청
	if (response.status === 401) { // I. 만료 또는 refresh 토큰만 유효할 때
		// I. Refresh
		const refreshRequest = new Request(`${PUBLIC_API_URL}/api/auth/refresh`, {
			method: 'GET',
			headers: request.headers
		});
		refreshRequest.headers.set('cookie', event.request.headers.get('cookie') ?? '');
		const refreshResponse = await fetch(refreshRequest);
		const refreshJson = await refreshResponse.json();
		if (!refreshResponse.ok) error(refreshResponse.status, refreshJson.error);
		// I. Refresh 에서 받은 토큰 브라우저 쿠키에 저장
		const parseCookies = cookieParser(refreshResponse.headers.getSetCookie());
		parseCookies.forEach(({
														name,
														value,
														...options
													}) => event.cookies.set(name, value, options as CookieSerializeOptions & { path: string }));
		// I. API 재요청
		const reRequest = new Request(request.url, {
			method: request.method,
			headers: new Headers({ 'Content-type': 'application/json' }),
			body: clonedRequestBody ? JSON.stringify(clonedRequestBody) : null
		});
		reRequest.headers.set('cookie', refreshResponse.headers.get('set-cookie') ?? '');

		return fetch(reRequest);
	}

	return response;
};

// TEST
// await fetch('http://localhost:8080/api/categories', {
// 	method: 'POST',
// 	headers: { 'Content-Type': 'application/json' },
// 	body: JSON.stringify({name: '새로운'}),
// 	credentials: 'include',
// });