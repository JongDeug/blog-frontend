<script lang="ts">
	import { Head, BlogOverview } from '$lib';

	const { data } = $props();
	const { initPostsWithCategory }: { initPostsWithCategory: Category & { posts: Post[] } } = data;
	const { name, posts } = initPostsWithCategory;
</script>

<Head title={name} />
<BlogOverview title={name} initPosts={posts} />
