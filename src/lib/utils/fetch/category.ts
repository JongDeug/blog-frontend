import { PUBLIC_API_URL } from '$env/static/public';

export const getCategories = (fetch: Fetch) => {
	return fetch(`${PUBLIC_API_URL}/category`).then((res) => res.json());
};

export const getPostsByCategoryId = (fetch: Fetch, id: string) => {
	return fetch(`${PUBLIC_API_URL}/category/${id}`).then((res) => res.json());
};

export const create = (fetch: Fetch, formData: FormData) => {
	return fetch(`${PUBLIC_API_URL}/category`, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'include',
		body: JSON.stringify({ name: formData.get('newCategory') })
	});
};

export const update = (fetch: Fetch, formData: FormData) => {
	const id = formData.get('targetCategory');

	return fetch(`${PUBLIC_API_URL}/category/${id}`, {
		method: 'PATCH',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'include',
		body: JSON.stringify({ name: formData.get('newCategory') })
	});
};

export const remove = (fetch: Fetch, formData: FormData) => {
	const id = formData.get('targetCategory');

	return fetch(`${PUBLIC_API_URL}/category/${id}`, {
		method: 'DELETE',
		credentials: 'include'
	});
};
