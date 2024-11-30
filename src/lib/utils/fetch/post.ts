import { PUBLIC_API_URL } from '$env/static/public';

export const getPosts = (query?: GetPostsQuery) => {
	if (query) {
		const queryString = new URLSearchParams({ ...parseObject(query) }).toString();
		return fetch(`${PUBLIC_API_URL}/post?${queryString}`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
	}
	return fetch(`${PUBLIC_API_URL}/post`).then((res) => res.json());
};

const parseObject = (obj: Object) => {
	return Object.entries(obj).reduce(
		(acc: { [key: string]: string }, [key, value]) => {
			if (Array.isArray(value)) acc[key] = value.join(',');
			else acc[key] = String(value);
			return acc;
		},
		{} as { [key: string]: string } // Record<string, string> 됨
	);
};
