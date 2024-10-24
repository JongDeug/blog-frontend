import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	logout: async ({ cookies, fetch }) => {
		// I. fetch 를 직접 인자로 받아 사용해야 handleFetch 호출됨
		const response = await fetch(`${PUBLIC_API_URL}/auth/logout`);

		// I. 에러처리 없이 그냥 로그아웃. 백엔드에서 Redis 사용해서 고쳐보자
		cookies.delete('isLogin', { path: '/' });
		cookies.delete('info', { path: '/' });
		cookies.set('refreshToken', 'null', { path: '/' });
		cookies.set('accessToken', 'null', { path: '/' });
		redirect(302, '/');
	}
};
