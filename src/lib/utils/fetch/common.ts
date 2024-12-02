import { PUBLIC_API_URL } from '$env/static/public';

export const upload = async (fetch: Fetch, formData: FormData) => {
	return fetch(`${PUBLIC_API_URL}/common/image`, {
		method: 'POST',
		headers: {}, // 브라우저 자동설정
		body: formData,
		credentials: 'include'
	});
};
