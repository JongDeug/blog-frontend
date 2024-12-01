import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { Auth } from '$lib';

export const load: PageServerLoad = async () => {};

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const redirectTo = formData.get('redirectTo')?.toString() || '/';

		const response = await Auth.login(email?.toString(), password?.toString());

		// 에러
		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}
		// 성공
		else {
			// const { username, role } = json;
			// cookies.set('info', JSON.stringify({ username, role }), { path: '/' });
			cookies.set('isLogin', JSON.stringify(true), { path: '/' });
			redirect(302, redirectTo);
		}
	}
} satisfies Actions;
