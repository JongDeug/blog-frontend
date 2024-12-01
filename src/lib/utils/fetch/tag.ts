import { PUBLIC_API_URL } from '$env/static/public';

export const getPostsByTagId = (id: string) => {
	return fetch(`${PUBLIC_API_URL}/tag/${id}`).then((res) => res.json());
};
