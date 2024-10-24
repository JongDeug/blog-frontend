import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
	const { isLogin } = locals;
	// I. getPosts (3개만 보여줌)
	const queryString = new URLSearchParams({ limit: '3' }).toString();
	const getPosts = await fetch(`${PUBLIC_API_URL}/posts?${queryString}`).then((res) => res.json());

	return { isLogin, getPosts };
}
