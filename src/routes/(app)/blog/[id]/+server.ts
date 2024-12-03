import { PostFetch } from '$lib';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const postId = params.id;

	if (!postId) {
		throw error(400, '삭제하려는 게시글 ID가 입력되지 않았습니다');
	}

	const response = await PostFetch.deletePost(fetch, postId);

	if (!response.ok) {
		const data = await response.json();
		throw error(data.statusCode, data.message);
	}

	return json(null, { status: 200 });
};
