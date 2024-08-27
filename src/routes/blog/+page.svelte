<script>
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';

	export let data;
	const { isLogin, getCategories, getPosts } = data;
	const categories = getCategories.categories;
	const posts = getPosts.posts;
</script>

<Head title="Blog" />

<Blogs title="All Posts" {posts} {categories} {isLogin} />
