import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

const send = async ({ method = '', path = '', data = {} }) => {
	const url = PUBLIC_API_URL + path;

	const res = await fetch(url, {
		method,
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: method === 'GET' ? null : JSON.stringify(data),
		credentials: 'include'
	});

	// I. form action 은 Response 를 full 로 넘기지 않기 때문에,
	// I. 프론트 서버에서 받은 쿠키를 클라로 넘겨야 함
	const setCookies = res.headers.getSetCookie();
	const json = await res.json();

	// I. 에러 처리법
	if (!res.ok) error(res.status, `${json.error}`);

	return {
		setCookies,
		json
	};
};

const getFetch = ({ path = '' }) => {
	return send({ method: 'GET', path });
};

const postFetch = ({ path = '', data = {} }) => {
	return send({ method: 'POST', path, data });
};

const patchFetch = ({ path = '', data = {} }) => {
	return send({ method: 'PATCH', path, data });
};

const deleteFetch = ({ path = '', data = {} }) => {
	return send({ method: 'DELETE', path, data });
};

export {
	getFetch,
	postFetch,
	patchFetch,
	deleteFetch
};