import { PostFetch } from '$lib';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	createPost: async ({ fetch, request }) => {
		const formData = await request.formData();
		formData.delete('postId');
		const draft = formData.get('draft') ? true : false;
		const tags = formData.get('tags')
			? formData
					.get('tags')
					?.toString()
					.split(',')
					.map((tag) => tag.trim())
			: undefined;
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
	}
};
