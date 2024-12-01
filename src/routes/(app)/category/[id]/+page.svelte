<script lang="ts">
	import { Head, Blog } from '$lib';

	const { data } = $props();
	const {
		initPostsWithCategory,
		isLogin
	}: { initPostsWithCategory: Category & { posts: Post[] }; isLogin: boolean } = data;
	const { name, posts } = initPostsWithCategory;
</script>

<Head title={name} />
<Blog title={name} initPosts={posts} {isLogin} />
