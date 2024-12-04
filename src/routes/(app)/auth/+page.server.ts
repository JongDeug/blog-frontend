import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthFetch } from '$lib';

export const actions = {
	login: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();
		const redirectTo = formData.get('redirectTo')?.toString() || '/';

		const response = await AuthFetch.login(fetch, formData);
		const data = await response.json();

		// 에러
		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}
		// 성공
		else {
			cookies.set('loginInfo', JSON.stringify({ name: data.name, role: data.role }), { path: '/' });
			cookies.set('isLogin', JSON.stringify(true), { path: '/' });
			redirect(302, redirectTo);
		}
	},

	logout: async ({ cookies, fetch }) => {
		await AuthFetch.logout(fetch);

		cookies.delete('isLogin', { path: '/' });
		cookies.delete('loginInfo', { path: '/' });
		redirect(302, '/');
	}
} satisfies Actions;
