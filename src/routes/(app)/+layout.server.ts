import type { LayoutServerLoad } from './$types';
import { v4 as uuidv4 } from 'uuid';

export const load: LayoutServerLoad = async ({ url: { pathname }, locals, cookies }) => {
	const { isLogin, loginInfo, guestId } = locals;

  // hooks.server.ts, handle 함수에서 요청 헤더를 바꿨을 때 immutable error 발생
	if (!guestId) guestId = uuidv4();
	cookies.set('guestId', guestId, {
		path: '/',
		maxAge: 365 * 24 * 60 * 60,
		httpOnly: true
	});

	return { pathname, loginInfo, isLogin, guestId };
};
