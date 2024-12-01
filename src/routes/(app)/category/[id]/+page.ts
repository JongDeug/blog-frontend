import { Category } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const getPostsWithCategory = await Category.getPostsByCategoryId(params.id);

	return { initPostsWithCategory: getPostsWithCategory };
};
