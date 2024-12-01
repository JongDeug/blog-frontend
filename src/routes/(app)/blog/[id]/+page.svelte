<script>
	import { Head, Post } from '$lib';

	const { data } = $props();
	const { initPost, isLogin } = data;
</script>

<Head title={initPost.title} />

<Post {initPost} {isLogin} />
