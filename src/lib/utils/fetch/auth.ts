import { PUBLIC_API_URL } from '$env/static/public';

export const login = (fetch: Fetch, formData: FormData) => {
	const email = formData.get('email');
	const password = formData.get('password');

	return fetch(`${PUBLIC_API_URL}/auth/login`, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`
		}),
		body: null
	});
};

export const logout = (fetch: Fetch) => {
	return fetch(`${PUBLIC_API_URL}/auth/logout`);
};

export const refresh = (fetch: Fetch) => {
	return fetch(`${PUBLIC_API_URL}/auth/token/refresh`);
};
