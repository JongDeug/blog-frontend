import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { AuthFetch } from '$lib';

export const load: PageServerLoad = async () => {};

export const actions = {
	login: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();
		const redirectTo = formData.get('redirectTo')?.toString() || '/';

		const response = await AuthFetch.login(fetch, formData);

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
