import { PUBLIC_API_URL } from '$env/static/public';

export let ssr = false;

export async function load({ fetch, locals }) {
	const { isLogin } = locals;

	// getCategories
	const getCategories = await fetch(`${PUBLIC_API_URL}/categories`).then((res) => res.json());

	return {
		isLogin,
		getCategories
	};
}
