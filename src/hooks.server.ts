import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const isLogin = event.cookies.get('isLogin');
	event.locals.isLogin = isLogin === 'true';
	const response = await resolve(event);
	return response;
};

export function handleError({ error, status }) {
	// I. 에러 출력
	console.error('Error occurred:', error);

	// I. error.svelte 로 넘어감
	if (status === 404) return { message: 'Page Not Found' };
	return { message: (error as Error).message };
}