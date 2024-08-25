// export const prerender = true;

export const load = async ({ url: { pathname }, locals }) => {
	const { isLogin } = locals;
	return { pathname, isLogin };
};

