<script lang="ts">
	import { Head, Blog } from '$lib';

	const { data } = $props();
	const {
		initPostsWithTag,
		isLogin
	}: { initPostsWithTag: Tag & { posts: Post[] }; isLogin: boolean } = data;
	const { name, posts } = initPostsWithTag;
</script>

<Head title={name} />
<Blog title={name} initPosts={posts} {isLogin} />
