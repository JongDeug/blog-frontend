<script lang="ts">
	import { Head, Blog } from '$lib';

	const { data } = $props();
	const { initPostsWithCategory }: { initPostsWithCategory: Category & { posts: Post[] } } = data;
	const { name, posts } = initPostsWithCategory;
</script>

<Head title={name} />
<Blog title={name} initPosts={posts} />
