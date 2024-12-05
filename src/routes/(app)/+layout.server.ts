import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url: { pathname }, locals }) => {
	const { isLogin, loginInfo, guestId } = locals;

	return { pathname, loginInfo, isLogin, guestId };
};
