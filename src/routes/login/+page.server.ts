import Auth from '../../services/auth';
import { redirect } from '@sveltejs/kit';
import { getCookie } from '../../utils/getCookie';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { setCookies, json } = await Auth.login({ email, password });

		if (json.message === '로그인 성공') {
			// I. 프론트 서버에서 받은 쿠키, Client 에 다시 설정
			setCookies.forEach(raw => {
				const { name, value, options } = getCookie(raw);
				console.log(name);
				cookies.set(name, value, options);
			});

			cookies.set('isLogin', 'true', { path: '/', maxAge: 60 });
			redirect(302, '/');
		}
	}
};

