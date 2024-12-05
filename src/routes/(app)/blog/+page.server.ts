import { CategoryFetch } from '$lib';
import { fail, redirect } from '@sveltejs/kit';

// 카테고리 관리가 /blog에 붙어있음
export const actions = {
	createCategory: async ({ fetch, request }) => {
		const formData = await request.formData();

		const response = await CategoryFetch.create(fetch, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	updateCategory: async ({ fetch, request }) => {
		const formData = await request.formData();

		const response = await CategoryFetch.update(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	deleteCategory: async ({ fetch, request }) => {
		const formData = await request.formData();

		const response = await CategoryFetch.remove(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	}
};
