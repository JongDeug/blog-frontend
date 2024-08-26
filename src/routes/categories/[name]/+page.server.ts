import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ params, fetch }) {
	const { name } = params;
	const queryString = new URLSearchParams({ category: name }).toString();

	// getPosts
	const getPosts = await fetch(`${PUBLIC_API_URL}/api/posts?${queryString}`)
		.then(res => res.json());

	return {
		name,
		getPosts
	};
}
