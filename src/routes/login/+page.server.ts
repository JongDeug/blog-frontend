import { error, fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const response = await fetch(`${PUBLIC_API_URL}/auth/login`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ email, password })
		});

		const json = await response.json();

		// I. 에러처리
		if (!response.ok) {
			if (response.status === 404) return fail(404, { notRegistered: true });
			else if (response.status === 401) return fail(401, { incorrect: true });
			error(response.status, json.error);
		}

		// I. 로그인 성공 시
		const { username, role } = json;
		cookies.set('info', JSON.stringify({ username, role }), { path: '/' });
		cookies.set('isLogin', JSON.stringify(true), { path: '/' });
		redirect(302, '/blog');
	}
};
