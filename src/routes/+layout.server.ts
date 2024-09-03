export const load = async ({ url: { pathname }, locals, cookies }) => {
	const { isLogin } = locals;
	// I. 사용자가 방문할 때마다 쿠키 업데이트(영구적)
	const guestLikeId = cookies.get('guestLikeId');
	if (guestLikeId) {
		cookies.set('guestLikeId', guestLikeId, {
			path: '/',
			maxAge: 365 * 24 * 60 * 60,
			httpOnly: false,
			secure: false,
			sameSite: 'none'
		});
	}

	return { pathname, isLogin };
};
