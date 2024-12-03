import { CategoryFetch } from '$lib';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	createCategory: async ({ fetch, request }) => {
		const formData = await request.formData();

		const response = await CategoryFetch.create(fetch, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, '/blog');
	},

	updateCategory: async ({ fetch, request }) => {
		const formData = await request.formData();

		const response = await CategoryFetch.update(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, '/blog');
	},

	deleteCategory: async ({ fetch, request }) => {
		const formData = await request.formData();

		const response = await CategoryFetch.remove(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, '/blog');
	}
};
