<script>
	import Head from '$lib/components/layout/Head.svelte';
	import Blog from '$lib/components/Blog.svelte';

	export let data;
	const post = data.getPost.post;
	const isLogin = data.isLogin;
</script>

<Head title={post?.title} />

<Blog {post} {isLogin} />
