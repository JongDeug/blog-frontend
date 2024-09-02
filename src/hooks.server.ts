import { error, type Handle, type HandleFetch } from '@sveltejs/kit';
import cookieParser from 'set-cookie-parser';
import type { CookieSerializeOptions } from 'cookie';
import { PUBLIC_API_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	const isLogin = event.cookies.get('isLogin');
	event.locals.isLogin = !!isLogin;
	return resolve(event);
};

export function handleError({ error, status }) {
	// I. 에러 출력
	console.error('Error occurred:', error);

	// I. error.svelte 로 넘어감
	if (status === 404) return { status: 404, message: 'Page Not Found' };
	return { status, message: (error as Error).message };
}

// request : Sveltekit(서버), fetch 요청 시 request
// event.request : 클라이언트(브라우저) raw Request => 클라이언트의 요청임
// 순서 : form actions 에서 fetch => handleFetch 에서 요청을 잡아서 가공 후 fetch => form actions 에서 받음
// I. API 요청 => 토큰 만료 시 => Refresh Token 으로 재발급 => API 재요청
export const handleFetch: HandleFetch = async ({ fetch, request, event }) => {
	// I. same-origin 이 아니라면 직접 넣어줘야 함
	// request.headers.set('cookie', event.request.headers.get('cookie') ?? '');

	// 이거 나중에 테스트 해보자
	// const cloneRequest = request.clone();

	// I. 이미 쓰인 request 가 넘어왔기 때문에 clone 하지 못함. 따로 다시 작성해야함
	let clonedRequestBody: any;
	if (request.method !== 'GET') {
		clonedRequestBody = await request.clone().json();
	}

	let response = await fetch(request);

	// I. 응답 cookie => 브라우저 cookie
	const parseCookies = cookieParser(response.headers.getSetCookie());
	parseCookies.forEach(({ name, value, ...options }) =>
		event.cookies.set(name, value, options as CookieSerializeOptions & { path: string })
	);

	// I. 토큰 만료 시
	if (
		response.status === 401 &&
		request.url !== `${PUBLIC_API_URL}/auth/logout` &&
		request.url !== `${PUBLIC_API_URL}/auth/login`
	) {
		const refreshResponse = await fetch(`${PUBLIC_API_URL}/auth/refresh`);
		// I. 예상한 에러
		if (!refreshResponse.ok) {
			const refreshJson = await refreshResponse.json();
			error(refreshResponse.status, refreshJson.error);
		}
		// I. 응답 cookie => 브라우저 cookie
		const parseCookies = cookieParser(refreshResponse.headers.getSetCookie());
		parseCookies.forEach(({ name, value, ...options }) =>
			event.cookies.set(name, value, options as CookieSerializeOptions & { path: string })
		);
		// I. API 재요청
		const reRequest = new Request(request.url, {
			method: request.method,
			headers: new Headers({ 'Content-type': 'application/json' }),
			body: clonedRequestBody ? JSON.stringify(clonedRequestBody) : null
		});
		response = await fetch(reRequest);
	}

	return response;
};
