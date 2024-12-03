import { CategoryFetch, PostFetch } from '$lib';
import type { PageServerLoad } from '../$types';

export let ssr = false;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const getPost = await PostFetch.getPost(fetch, params.id);

	const getCategories = await CategoryFetch.getCategories(fetch);

	return {
		initPost: getPost,
		initCategories: getCategories,
		postId: params.id
	};
};
