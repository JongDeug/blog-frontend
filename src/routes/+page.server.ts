import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch }) {
	// getPosts (3개만 보여줌)
	const queryString = new URLSearchParams({ limit: '3' }).toString();
	const getPosts = await fetch(`${PUBLIC_API_URL}/api/posts?${queryString}`)
		.then(res => res.json());

	return { getPosts };
}