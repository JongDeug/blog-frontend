import { CategoryFetch } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const getPostsWithCategory = await CategoryFetch.getPostsByCategoryId(params.id);

	return { initPostsWithCategory: getPostsWithCategory };
};
