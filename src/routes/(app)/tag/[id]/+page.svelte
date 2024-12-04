<script lang="ts">
	import { Head, Blog } from '$lib';

	const { data } = $props();
	const { initPostsWithTag }: { initPostsWithTag: Tag & { posts: Post[] } } = data;
	const { name, posts } = initPostsWithTag;
</script>

<Head title={name} />
<Blog title={name} initPosts={posts} />
