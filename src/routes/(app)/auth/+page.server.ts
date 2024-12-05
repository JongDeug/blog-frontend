import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthFetch } from '$lib';

export const actions = {
	login: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();

		const response = await AuthFetch.login(fetch, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		cookies.set('loginInfo', JSON.stringify({ name: data.name, role: data.role }), { path: '/' });
		cookies.set('isLogin', JSON.stringify(true), { path: '/' });

		redirect(302, '/');
	},

	logout: async ({ cookies, fetch }) => {
		await AuthFetch.logout(fetch);

		// 실패 여부와 상관없이 초기화
		cookies.delete('isLogin', { path: '/' });
		cookies.delete('loginInfo', { path: '/' });

		redirect(302, '/');
	}
} satisfies Actions;
