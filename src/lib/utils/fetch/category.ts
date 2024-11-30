import { PUBLIC_API_URL } from '$env/static/public';

export const getCategories = () => {
	return fetch(`${PUBLIC_API_URL}/category`).then((res) => res.json());
};
