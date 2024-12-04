import type { LayoutServerLoad } from './$types';

// cookies => browser
export const load: LayoutServerLoad = async ({ url: { pathname }, locals }) => {
	const { isLogin, guestId, loginInfo } = locals;

	return { pathname, loginInfo, isLogin, guestId };
};
