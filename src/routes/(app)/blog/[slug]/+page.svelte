<script>
	import Head from '$lib/components/layout/Head.svelte';
	import Blog from '$lib/components/Blog.svelte';

	export let data;
	const { isLogin, getPost, info } = data;
	const post = getPost.post;
</script>

<Head title={post?.title} />

<Blog {post} {isLogin} {info} />
