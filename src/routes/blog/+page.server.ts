import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch }) {
	// getPosts
	const getPosts = await fetch(`${PUBLIC_API_URL}/api/posts`)
		.then(res => res.json());

	// getCategories
	const getCategories = await fetch(`${PUBLIC_API_URL}/api/categories`)
		.then(res => res.json());

	return { getPosts, getCategories };
}