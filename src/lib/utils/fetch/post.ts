import { PUBLIC_API_URL } from '$env/static/public';

export const getPosts = (query?: GetPostsQuery) => {
	if (query) {
		const queryString = new URLSearchParams({ ...transformValuesToString(query) }).toString();
		return fetch(`${PUBLIC_API_URL}/post?${queryString}`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
	}
	return fetch(`${PUBLIC_API_URL}/post`).then((res) => res.json());
};

export const getPost = (
	fetch: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	},
	id: string
) => {
	return fetch(`${PUBLIC_API_URL}/post/${id}`, { credentials: 'include' }).then((res) =>
		res.json()
	);
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
