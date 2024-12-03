import { PUBLIC_API_URL } from '$env/static/public';

export const getCategories = (fetch: Fetch) => {
	return fetch(`${PUBLIC_API_URL}/category`).then((res) => res.json());
};

export const getPostsByCategoryId = (fetch: Fetch, id: string) => {
	return fetch(`${PUBLIC_API_URL}/category/${id}`).then((res) => res.json());
};
