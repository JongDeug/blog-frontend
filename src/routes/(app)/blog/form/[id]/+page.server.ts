import { CategoryFetch, PostFetch } from '$lib';
import type { PageServerLoad } from '../$types';
import { fail, redirect } from '@sveltejs/kit';

export let ssr = false;

export const load: PageServerLoad = async ({ fetch, params }) => {
	// @ts-ignore // params.id 자꾸 타입 에러남
	const getPost = await PostFetch.getPost(fetch, params.id);

	const getCategories = await CategoryFetch.getCategories(fetch);

	return {
		initPost: getPost,
		initCategories: getCategories
	};
};

export const actions = {
	update: async ({ fetch, request, params }) => {
		const formData = await request.formData();
		const draft = formData.get('draft') ? true : false;
		const tags = formData.get('tags')
			? formData
					.get('tags')
					?.toString()
					.split(',')
					.map((tag) => tag.trim())
			: undefined;
		formData.delete('postId');
		// 이미지 일단 Keep

		const jsonData: any = {};
		formData.forEach((value, key) => {
			jsonData[key] = value;
		});

		const response = await PostFetch.updatePost(fetch, params.id, {
			...jsonData,
			draft,
			tags
		});

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	}
};
