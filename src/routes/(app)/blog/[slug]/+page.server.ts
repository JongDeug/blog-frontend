import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { isLogin, guestLikeId, info } = locals;

	return {
		isLogin,
		guestLikeId,
		info,
	};
};