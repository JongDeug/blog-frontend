import { CategoryFetch, PostFetch } from '$lib';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
	const { posts, _ } = await PostFetch.getPosts(fetch);
	const categories = await CategoryFetch.getCategories(fetch);

	return { initPosts: posts, initCategories: categories };
};
