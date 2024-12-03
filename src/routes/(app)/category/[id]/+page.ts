import { CategoryFetch } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const getPostsWithCategory = await CategoryFetch.getPostsByCategoryId(fetch, params.id);

	return { initPostsWithCategory: getPostsWithCategory };
};
