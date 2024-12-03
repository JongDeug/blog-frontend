import { CategoryFetch } from '$lib';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
	const getCategories = await CategoryFetch.getCategories(fetch);

	return {
		initCategories: getCategories
	};
};
