import { TagFetch } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const getPostsWithTag = await TagFetch.getPostsByTagId(params.id);

	return { initPostsWithTag: getPostsWithTag };
};
