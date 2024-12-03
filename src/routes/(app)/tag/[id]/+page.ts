import { TagFetch } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const getPostsWithTag = await TagFetch.getPostsByTagId(fetch, params.id);

	return { initPostsWithTag: getPostsWithTag };
};
