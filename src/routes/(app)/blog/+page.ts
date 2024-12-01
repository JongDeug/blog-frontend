import { CategoryFetch, PostFetch } from '$lib';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({}) => {
	const { posts, _ } = await PostFetch.getPosts();
	const categories = await CategoryFetch.getCategories();

	return { initPosts: posts, initCategories: categories };
};
