import { PUBLIC_API_URL } from '$env/static/public';
import { customFetch } from '$lib/utils/api/customFetch';
import { alertError } from '$lib/utils/alertError';

export const createParentCommentForUser = async (data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/comments`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

export const createChildCommentForUser = async (data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/child-comments`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

export const updateCommentForUser = async (commentId: string, content: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/comments/${commentId}`, {
			method: 'PATCH',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ content })
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

export const deleteCommentForUser = async (commentId: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/comments/${commentId}`, {
			method: 'DELETE'
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

// ===========================================================================================

export const createParentCommentForGuest = async (data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/comments/guest`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		// I. 비회원이라 customFetch XX
		const response = await fetch(request);
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

export const createChildCommentForGuest = async (data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/child-comments/guest`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await fetch(request);
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

export const updateCommentForGuest = async (commentId: string, data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/comments/guest/${commentId}`, {
			method: 'PATCH',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await fetch(request);
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};

export const deleteCommentForGuest = async (commentId: string, password: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/comments/guest/${commentId}`, {
			method: 'DELETE',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ password })
		});

		const response = await fetch(request);
		const json = await response.json();

		if (!response.ok) return alertError(response.status, json.error);

		window.location.reload();
	} catch (err) {
		throw err;
	}
};
