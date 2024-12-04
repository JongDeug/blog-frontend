import { CommentFetch, PostFetch } from '$lib';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// +page.ts => 쿠키 전달 때문에 +page.server.ts 사용
export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const getPost = await PostFetch.getPost(fetch, params.id);

	if (getPost?.statusCode) {
		error(getPost.statusCode, { message: getPost.message });
	}

	return { initPost: getPost };
};

export const actions = {
	createCommentByUser: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.createByUser(fetch, params.id, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	},

	updateCommentByUser: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.updateByUser(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	},

	deleteCommentByUser: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.deleteByUser(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	},

	createCommentByGuest: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.createByGuest(fetch, params.id, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	},

	updateCommentByGuest: async ({ request, fetch, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.updateByGuest(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	},

	deleteCommentByGuest: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.deleteByGuest(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		redirect(302, `/blog/${params.id}`);
	}
};
