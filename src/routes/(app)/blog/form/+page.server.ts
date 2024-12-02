import { PostFetch } from '$lib';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ fetch, request }) => {
		const formData = await request.formData();
		formData.delete('postId');
		const draft = formData.get('draft') ? true : false;
		const tags = formData.get('tags')
			? formData
					.get('tags')
					?.toString()
					.split(',')
					.map((tag) => tag.trim())
			: null;
		// 이미지 일단 Keep

		const jsonData: any = {};
		formData.forEach((value, key) => {
			jsonData[key] = value;
		});

		const response = await PostFetch.createPost(fetch, {
			...jsonData,
			draft,
			tags
		});
		const data = await response.json();

		// 에러
		if (!response.ok) {
			return fail(data.statusCode, {
				message: data.message,
				...jsonData,
				draft,
				tags
			});
		}

		redirect(302, `/blog/${data}`);
	},

	update: async ({ fetch, request }) => {
		const formData = await request.formData();
		const postId = formData.get('postId')?.toString();
		const draft = formData.get('draft') ? true : false;
		const tags = formData.get('tags')
			? formData
					.get('tags')
					?.toString()
					.split(',')
					.map((tag) => tag.trim())
			: null;
		formData.delete('postId');
		// 이미지 일단 Keep

		const jsonData: any = {};
		formData.forEach((value, key) => {
			jsonData[key] = value;
		});

		const response = await PostFetch.updatePost(fetch, postId!, {
			...jsonData,
			draft,
			tags
		});

		// 에러
		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, {
				message: data.message,
				...jsonData,
				draft,
				tags
			});
		}

		redirect(302, `/blog/${postId}`);
	}
};
