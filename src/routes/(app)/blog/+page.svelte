<script lang="ts">
	import { Head, Blog } from '$lib';

	const { data } = $props();
	const { initPosts, initCategories } = data;
</script>

<Head title="Blog" />
<Blog title="All Posts" {initPosts} {initCategories} searchBox />
