import type { Handle } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

// event : 브라우저 요청
export const handle: Handle = async ({ event, resolve }) => {
	// 로그인 유무
	const isLogin = event.cookies.get('isLogin');
	event.locals.isLogin = isLogin ? JSON.parse(isLogin) : false;

	// 게스트 uuid 발급, 기간 무제한
	let guestId = event.cookies.get('guestId');
	if (!guestId) guestId = uuidv4();
	event.cookies.set('guestId', guestId, {
		path: '/',
		maxAge: 365 * 24 * 60 * 60,
		httpOnly: true
	});
	event.locals.guestId = guestId;

	return resolve(event);
};
