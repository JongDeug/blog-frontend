import { error, fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	create: async ({ fetch, request }) => {
		const formData = await request.formData();
		const name = formData.get('name');

		const response = await fetch(`${PUBLIC_API_URL}/api/categories`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ name })
		});

		const json = await response.json();

		if (!response.ok) {
			if (response.status === 409) {
				fail(409, { exists: true });
				redirect(302, '/blog');
			}
			error(response.status, json.error);
		}

		redirect(302, '/blog');
	}
};