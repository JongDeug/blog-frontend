import { Tag } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const getPostsWithTag = await Tag.getPostsByTagId(params.id);

	return { initPostsWithTag: getPostsWithTag };
};
