import Posts from '../../../services/posts';

export async function load({ params }) {
	const { name } = params;
	const getPosts = await Posts.getPosts({ category: name });

	console.log(getPosts);
	return {
		name,
		getPosts
	};
}
