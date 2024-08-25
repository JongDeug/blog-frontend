import Post from '../services/posts';

export async function load() {
	const getPosts = await Post.getPosts();
	return { getPosts };
}