<script>
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';

	export let data;
	const categories = data.getCategories.categories;
	const posts = data.getPosts.posts;
</script>

<Head title="Blog" />

<Blogs title="All Posts" {posts} {categories} />
