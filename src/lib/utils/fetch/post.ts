import { PUBLIC_API_URL } from '$env/static/public';

export const getPosts = (fetch: Fetch, query?: GetPostsQuery) => {
	if (query) {
		const queryString = new URLSearchParams({ ...transformValuesToString(query) }).toString();
		return fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
	}
	return fetch(`${PUBLIC_API_URL}/post`).then((res) => res.json());
};

export const getPost = (fetch: Fetch, id: string, isEdit: boolean) => {
	if (isEdit) {
		const queryString = new URLSearchParams({ isEdit: 'true' }).toString();
		return fetch(`${PUBLIC_API_URL}/post/${id}?${queryString}`).then((res) => res.json());
	}
	return fetch(`${PUBLIC_API_URL}/post/${id}`).then((res) => res.json());
};

export const createPost = async (fetch: Fetch, data: Object) => {
	return fetch(`${PUBLIC_API_URL}/post`, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ ...data })
	});
};

export const updatePost = async (fetch: Fetch, postId: string, data: Object) => {
	return fetch(`${PUBLIC_API_URL}/post/${postId}`, {
		method: 'PATCH',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ ...data })
	});
};

export const deletePost = async (fetch: Fetch, postId: string) => {
	return fetch(`${PUBLIC_API_URL}/post/${postId}`, {
		method: 'DELETE'
	});
};

export const postLike = async (fetch: Fetch, postId: string) => {
	return fetch(`${PUBLIC_API_URL}/post/like/${postId}`);
};

const transformValuesToString = (obj: Object) => {
	return Object.entries(obj).reduce(
		(acc: { [key: string]: string }, [key, value]) => {
			if (Array.isArray(value)) acc[key] = value.join(',');
			else acc[key] = String(value);
			return acc;
		},
		{} as { [key: string]: string } // Record<string, string> 됨
	);
};
