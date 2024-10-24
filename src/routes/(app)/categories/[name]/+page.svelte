<script>
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';

	export let data;
	const categoryName = data.name;
	const posts = data.getPosts.posts;
</script>

<Head title={categoryName} />

<Blogs title={categoryName} {posts} search={false} />
