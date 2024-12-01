import { PUBLIC_API_URL } from '$env/static/public';

export function login(email?: string, password?: string) {
	return fetch(`${PUBLIC_API_URL}/auth/login`, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`
		}),
		body: undefined
	});
}

export function logout() {
	return fetch(`${PUBLIC_API_URL}/auth/logout`);
}
