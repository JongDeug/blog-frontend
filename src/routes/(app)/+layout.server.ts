import type { LayoutServerLoad } from './$types';

// cookies => browser
export const load: LayoutServerLoad = async ({ url: { pathname }, locals }) => {
	const { isLogin, guestId } = locals;

	return { pathname, isLogin, guestId };
};
