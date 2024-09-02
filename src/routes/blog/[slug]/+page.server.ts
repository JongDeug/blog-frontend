import { PUBLIC_API_URL } from '$env/static/public';
// @ts-ignore
import edjsParser from 'editorjs-parser';

export async function load({ params, fetch, locals }) {
	const { slug } = params;
	const { isLogin } = locals;

	// getPost
	// const guestLikeId = event.localStorage.get('guestLikeId');
	// const queryString = new URLSearchParams({ guestLikeId }).toString();
	// console.log(queryString);
	const getPost = await fetch(`${PUBLIC_API_URL}/posts/${slug}`).then((res) =>
		res.json()
	);

	// convert editorjs data to html
	if (getPost?.post?.content) {
		const content = JSON.parse(getPost.post.content);
		const parser = new edjsParser(undefined);
		getPost.post.content = parser.parse(content);
	}

	return {
		isLogin,
		getPost
	};
}
