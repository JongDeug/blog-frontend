import { PUBLIC_API_URL } from '$env/static/public';
import { alertError } from '$lib/utils/alertError';

// I. API 요청 => 토큰 만료 시 => Refresh Token 으로 재발급 => API 재요청
export const customFetch = async (input: Request) => {
	try {
		const cloneRequest = input.clone();
		let response = await fetch(input);

		if (response.status === 401) {
			const refreshResponse = await fetch(`${PUBLIC_API_URL}/auth/refresh`);
			// I. 예상한 에러
			if (!refreshResponse.ok) {
				const refreshJson = await refreshResponse.json();
				return alertError(refreshResponse.status, refreshJson.error);
			}
			// I. API 재요청
			response = await fetch(cloneRequest);
		}

		return response;
	} catch (err) {
		return null;
	}
};
