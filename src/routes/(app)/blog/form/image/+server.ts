import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CommonFetch } from '$lib';

export const GET: RequestHandler = () => {
	throw error(404, '페이지를 찾을 수 없습니다');
};

// 이미지 업로드, 토큰 만료 시 handleFetch에서 refresh 하려고 만듦.
export const POST: RequestHandler = async ({ request, fetch }) => {
	const formData = await request.formData();

	const response = await CommonFetch.upload(fetch, formData);
	const data = await response.json();

	// 에러
	if (!response.ok) {
		throw error(data.statusCode, data.message);
	}

	return json(data, { status: 200 });
};
