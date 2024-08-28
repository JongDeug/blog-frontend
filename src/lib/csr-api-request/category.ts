import { customFetch } from '$lib/utils/customFetch';
import { PUBLIC_API_URL } from '$env/static/public';
import { alertError } from '$lib/utils/alertError';

// I. store 예시
// import { writable } from 'svelte/store';
// const getCategories = async () => {
// 	// try {
// 	const data = writable(null);
//
// 	// 비동기 함수로 데이터를 가져옴
// 	const fetchData = async () => {
// 		try {
// 			const response = await fetch(`${PUBLIC_API_URL}/categories`);
// 			const json = await response.json();
//
// 			if (response.ok) {
// 				return alertError(response.status, json.error);
// 			}
//
// 			data.set(json);
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};
//
// 	await fetchData();
// 	return data;
// 	// } catch (err) {
// 	// 	return null;
// 	// }
// };
// export const test = await getCategories();

export const createCategory = async (name: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/categories`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ name })
		});

		const response = await customFetch(request);
		if (!response) return;

		// I. 예상한 에러
		if (!response.ok) {
			const json = await response.json();
			return alertError(response.status, json.error);
		}

		window.location.reload();
	} catch (err) {
		return null;
	}
};

export const updateCategory = async (target: string, name: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/categories/${target}`, {
			method: 'PATCH',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ name })
		});

		const response = await customFetch(request);
		if (!response) return;

		// I. 예상한 에러
		if (!response.ok) {
			const json = await response.json();
			return alertError(response.status, json.error);
		}

		window.location.reload();
	} catch (err) {
		return null;
	}
};

export const deleteCategory = async (name: string) => {
	try {
		const request = new Request(`${PUBLIC_API_URL}/categories/${name}`, {
			method: 'DELETE',
		});

		const response = await customFetch(request);
		if (!response) return;

		// I. 예상한 에러
		if (!response.ok) {
			const json = await response.json();
			return alertError(response.status, json.error);
		}

		window.location.reload();
	} catch (err) {
		return null;
	}
};
