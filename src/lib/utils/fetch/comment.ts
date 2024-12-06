import { PUBLIC_API_URL } from '$env/static/public';

export const createByUser = (fetch: Fetch, postId: string, formData: FormData) => {
	return fetch(`${PUBLIC_API_URL}/post/comment/user`, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			postId,
			content: formData.get('content'),
			parentCommentId: formData.get('parentCommentId') // 없으면 null 처리
		})
	});
};

export const updateByUser = (fetch: Fetch, formData: FormData) => {
	const commentId = formData.get('commentId');

	return fetch(`${PUBLIC_API_URL}/post/comment/user/${commentId}`, {
		method: 'PATCH',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			content: formData.get('content')
		})
	});
};

export const deleteByUser = (fetch: Fetch, formData: FormData) => {
	const commentId = formData.get('commentId');

	return fetch(`${PUBLIC_API_URL}/post/comment/user/${commentId}`, {
		method: 'DELETE'
	});
};

export const createByGuest = (fetch: Fetch, postId: string, formData: FormData) => {
	return fetch(`${PUBLIC_API_URL}/post/comment/guest`, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			postId,
			content: formData.get('content'),
			nickName: formData.get('nickName'),
			email: formData.get('email'),
			password: formData.get('password'),
			parentCommentId: formData.get('parentCommentId') // 없으면 null 처리
		})
	});
};

export const updateByGuest = (fetch: Fetch, formData: FormData) => {
	const commentId = formData.get('commentId');

	return fetch(`${PUBLIC_API_URL}/post/comment/guest/${commentId}`, {
		method: 'PATCH',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			content: formData.get('content'),
			password: formData.get('password')
		})
	});
};

export const deleteByGuest = (fetch: Fetch, formData: FormData) => {
	const commentId = formData.get('commentId');

	return fetch(`${PUBLIC_API_URL}/post/comment/guest/${commentId}`, {
		method: 'DELETE',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ password: formData.get('password') })
	});
};
