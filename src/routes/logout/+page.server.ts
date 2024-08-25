import Auth from '../../services/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		const { json } = await Auth.logout();

		if (json.message === '로그아웃 완료') {
			cookies.delete('isLogin', { path: '/' });
			redirect(302, '/');
		}
	}
};
