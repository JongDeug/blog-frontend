import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const get = await fetch(`${PUBLIC_API_URL}/post`).then((res) => res.json());

	return {
		posts: get.posts
	};
};
