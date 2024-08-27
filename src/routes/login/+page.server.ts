import { error, fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const response = await fetch(`${PUBLIC_API_URL}/api/auth/login`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ email, password })
		});

		const json = await response.json();

		// I. 에러처리
		if (!response.ok) {
			if (response.status === 404) return fail(404, { notRegistered: true });
			else if (response.status === 401) return fail(404, { incorrect: true });
			error(response.status, json.error);
		}

		if (json.message === '로그인 성공') {
			cookies.set('isLogin', 'true', { path: '/', maxAge: 60 });
			redirect(302, '/');
		}
	}
};

