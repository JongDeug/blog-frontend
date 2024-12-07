import { PUBLIC_API_URL } from '$env/static/public';
import { AuthFetch, saveJwtInCookie } from '$lib';
import {
	error as throwError,
	type Handle,
	type HandleFetch,
	type HandleServerError
} from '@sveltejs/kit';

// event : 브라우저 요청
export const handle: Handle = async ({ event, resolve }) => {
	// 로그인
	const isLogin = event.cookies.get('isLogin');
	event.locals.isLogin = isLogin ? JSON.parse(isLogin) : false;
	const loginInfo = event.cookies.get('loginInfo');
	event.locals.loginInfo = loginInfo ? JSON.parse(loginInfo) : null;
  const guestId = event.cookies.get('guestId');
	event.locals.guestId = guestId ? guestId : undefined;

	return resolve(event);
};

// [동작 방식]
// => Sveltekit Server fetch
// => Catch fetch in handleFetch
// => return response to the SvelteKit Server
export const handleFetch: HandleFetch = async ({ fetch, request, event }) => {
	let cloneRequest = request.clone();
	let response = await fetch(request);

	saveJwtInCookie(response, event);

	// 1. 토큰 만료(401)
	if (
		response.status === 401 &&
		request.url !== `${PUBLIC_API_URL}/auth/logout` &&
		request.url !== `${PUBLIC_API_URL}/auth/login`
	) {
		// 2. refresh 요청
		const res = await AuthFetch.refresh(fetch);

		if (!res.ok) {
			const data = await res.json();
			console.error('[Hooks Server handleFetch] :', data);
			throwError(data.statusCode, data.message);
		}

		// 2-1. 쿠키에 다시 저장
		saveJwtInCookie(res, event);

		// 3. API 재요청
		let reRequest: Request;
		// 이미지
		if (request.url === `${PUBLIC_API_URL}/common/image`) {
			reRequest = await createRequestMultipartFormData(cloneRequest);
		} else if (request.method === 'DELETE' || request.method === 'GET') {
			reRequest = createRequest(cloneRequest);
		} else {
			reRequest = await createRequestForJson(cloneRequest);
		}

		response = await fetch(reRequest);
	}

	return response;
};

// Unexpected Error 잡아줌
export const handleError: HandleServerError = ({ status, error }) => {
	console.error('[Hooks Server] : ', error);

	// 예상되지 않은 404는 애초에 +error.svelte로 던져지지 않음
	if (status === 404) {
		return throwError(status, '페이지를 찾을 수 없습니다');
	}

	// Unexpected Error를 잡아서 +error.svelte로 던짐
	return {
		message: 'Whoops!',
		status
	};
};

const createRequestForJson = async (request: Request) => {
	const json = await request.json();

	return new Request(request.url, {
		method: request.method,
		headers: new Headers({ 'Content-type': 'application/json' }),
		body: JSON.stringify({ ...json })
	});
};

const createRequest = (request: Request) => {
	return new Request(request.url, {
		method: request.method
	});
};

const createRequestMultipartFormData = async (request: Request) => {
	const formData = await request.formData();
	return new Request(request.url, {
		method: request.method,
		headers: {}, // formData가 자동 설정
		body: formData
	});
};
