import Post from '../../services/posts';
import Categories from '../../services/categories';

export async function load() {
	const getPosts = await Post.getPosts();
	const getCategories = await Categories.getCategories();
	return { getPosts, getCategories };
}