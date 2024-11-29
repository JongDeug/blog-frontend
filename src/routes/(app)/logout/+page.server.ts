import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { Auth } from '$lib';

export const load: PageServerLoad = async () => {};

// client side에서 로그아웃 해보려 했지만,
// access token이 SvelteKit 서버에 담겨 있음

export const actions = {
	logout: async ({ cookies }) => {
		await Auth.logout();

		cookies.delete('isLogin', { path: '/' });
		// cookies.delete('info', { path: '/' });
		redirect(302, '/');
	}
} satisfies Actions;
