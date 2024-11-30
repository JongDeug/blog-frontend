import { Category, Post } from '$lib';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({}) => {
	const { posts, _ } = await Post.getPosts();
	const categories = await Category.getCategories();

	return { initPosts: posts, initCategories: categories };
};
