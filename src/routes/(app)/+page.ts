import { PostFetch } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const { posts, cursor } = await PostFetch.getPosts(fetch);

	return { initPosts: posts };
};
