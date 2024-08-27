import { PUBLIC_API_URL } from '$env/static/public';

async function customFetch(input: RequestInfo, init?: RequestInit) {
	let response = await fetch(input, init);

	// I. 토큰 만료 시
	if (response.status === 401) {
		const refreshResponse = await fetch(`${PUBLIC_API_URL}/api/auth/refresh`, {
			method: 'GET',
			credentials: 'include'
		});

		if (refreshResponse.ok) {
			const data = await refreshResponse.json();
			accessToken.set(data.newAccessToken); // Update the access token

			// Retry the original request with the new token
			init = init || {};
			init.headers = {
				...init.headers,
				'Authorization': `Bearer ${data.newAccessToken}`
			};
			response = await fetch(input, init);
		}
	}

	return response;
}