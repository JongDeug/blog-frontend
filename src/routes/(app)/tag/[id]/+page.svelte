<script lang="ts">
	import { Head, BlogOverview } from '$lib';

	const { data } = $props();
	const { initPostsWithTag }: { initPostsWithTag: Tag & { posts: Post[] } } = data;
	const { name, posts } = initPostsWithTag;
</script>

<Head title={name} />
<BlogOverview title={name} initPosts={posts} />
