import { PostFetch } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;

// +page.ts => 쿠키 전달 때문에 +page.server.ts 사용
export const load: PageServerLoad = async ({ params, fetch }) => {
	const getPost = await PostFetch.getPost(fetch, params.id);

	if (getPost?.statusCode) {
		error(getPost.statusCode, { message: getPost.message });
	}

	return { initPost: getPost };
};
