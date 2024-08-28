import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ params, fetch }) {
	const { slug } = params;

	// getPost
	const getPost = await fetch(`${PUBLIC_API_URL}/posts/${slug}`)
		.then(res => res.json());

	return {
		getPost
	};
}