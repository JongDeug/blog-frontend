import Posts from '../../../services/posts';

export async function load({ params }) {
	const { slug } = params;
	const getPost = await Posts.getPost(slug);

	return {
		getPost
	};
}