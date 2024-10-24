import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch, locals }) {
	const { isLogin } = locals;

	// getPosts
	const getPosts = await fetch(`${PUBLIC_API_URL}/posts`)
		.then(res => res.json());

	// getCategories
	const getCategories = await fetch(`${PUBLIC_API_URL}/categories`)
		.then(res => res.json());

	return { isLogin, getPosts, getCategories };
}