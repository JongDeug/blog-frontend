import { CategoryFetch } from '$lib';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({}) => {
	const getCategories = await CategoryFetch.getCategories();

	return {
		initCategories: getCategories
	};
};
