import { PUBLIC_API_URL } from '$env/static/public';

export let ssr = false;

export async function load({ fetch, params }) {
	const { slug } = params;

	// getPost
	const getPost = await fetch(`${PUBLIC_API_URL}/posts/${slug}`).then((res) => res.json());

	// getCategories
	const getCategories = await fetch(`${PUBLIC_API_URL}/categories`).then((res) => res.json());

	return {
		getPost,
		getCategories
	};
}
