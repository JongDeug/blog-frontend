import { PostFetch } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const { posts, _ } = await PostFetch.getPosts(fetch);

	return { initPosts: posts };
};
