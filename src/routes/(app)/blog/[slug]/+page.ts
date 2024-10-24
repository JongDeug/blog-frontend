import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { config } from '$lib/config';

export const ssr = false;

export const load: PageLoad = async ({ params, fetch, data }) => {
	const { slug } = params;
	const { isLogin, guestLikeId, info } = data;

	// getPost
	let getPost;
	if (guestLikeId) {
		const queryString = new URLSearchParams({ guestLikeId }).toString();
		getPost = await fetch(`${PUBLIC_API_URL}/posts/${slug}?${queryString}`).then((res) =>
			res.json()
		);
	} else {
		getPost = await fetch(`${PUBLIC_API_URL}/posts/${slug}`).then((res) => res.json());
	}

	getPost.post.content = JSON.parse(getPost.post.content);


	return {
		isLogin,
		info,
		getPost
	};
};
