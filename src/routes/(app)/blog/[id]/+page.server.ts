import { CommentFetch, PostFetch } from '$lib';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const getPost = await PostFetch.getPost(fetch, params.id);

	if (getPost?.statusCode) {
		error(getPost.statusCode, { message: getPost.message });
	}

	return { initPost: getPost };
};

export const actions = {
	deletePost: async ({ fetch, params }) => {
		const response = await PostFetch.deletePost(fetch, params.id);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	postLike: async ({ fetch, params }) => {
		const response = await PostFetch.postLike(fetch, params.id);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	createCommentByUser: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.createByUser(fetch, params.id, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	updateCommentByUser: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.updateByUser(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	deleteCommentByUser: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.deleteByUser(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	createCommentByGuest: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.createByGuest(fetch, params.id, formData);
		const data = await response.json();

		if (!response.ok) {
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	updateCommentByGuest: async ({ request, fetch, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.updateByGuest(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	},

	deleteCommentByGuest: async ({ fetch, request, params }) => {
		const formData = await request.formData();

		const response = await CommentFetch.deleteByGuest(fetch, formData);

		if (!response.ok) {
			const data = await response.json();
			return fail(data.statusCode, { message: data.message });
		}

		return { success: true };
	}
};
