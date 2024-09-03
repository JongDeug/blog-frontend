import { customFetch } from '$lib/utils/api/customFetch';
import { PUBLIC_API_URL, PUBLIC_URL } from '$env/static/public';
import { alertError } from '$lib/utils/alertError';

export const createPost = async (data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		// I. 예상한 에러
		if (!response.ok) return alertError(response.status, json.error);

		window.location.href = `${PUBLIC_URL}/blog/${json.id}`;
	} catch (err) {
		throw err;
	}
};

export const updatePost = async (id: string, data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/${id}`, {
			method: 'PATCH',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		// I. 예상한 에러
		if (!response.ok) return alertError(response.status, json.error);

		window.location.href = `${PUBLIC_URL}/blog/${id}`;
	} catch (err) {
		throw err;
	}
};

export const deletePost = async (id: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/${id}`, { method: 'DELETE' });

		const response = await customFetch(request);
		if (!response) return null; // return error 를 던졌을 때는 어떻게 처리되는지 궁금하지 않아?
		const json = await response.json();

		// I. 예상한 에러
		if (!response.ok) return alertError(response.status, json.error);

		window.location.href = `${PUBLIC_URL}/blog`;
	} catch (err) {
		throw err;
	}
};

export const postLike = async (data: {}) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/posts/like`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ...data })
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		// I. 예상한 에러
		if (!response.ok) return alertError(response.status, json.error);

		// I. 받은 guestLikeId 1년 쿠키 저장
		const age = 365 * 24 * 60 * 60 * 60;
		document.cookie = `guestLikeId=${json.guestLikeId}; path=/; max-age=${age};`;
		return true;
	} catch (err) {
		throw err;
	}
};

export const uploadImage = async (file: File) => {
	try {
		const formData = new FormData();
		formData.append('image', file);

		const request = new Request(`${PUBLIC_API_URL}/posts/upload`, {
			method: 'POST',
			headers: {}, // 브라우저가 자동 설정
			body: formData
		});

		const response = await customFetch(request);
		if (!response) return null;
		const json = await response.json();

		// I. 예상한 에러
		if (!response.ok) return alertError(response.status, json.error);

		return json;
	} catch (err) {
		throw err;
	}
};
