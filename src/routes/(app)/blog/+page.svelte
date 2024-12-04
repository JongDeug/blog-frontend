<script lang="ts">
	import { browser } from '$app/environment';
	import { Head, Blog } from '$lib';

	const { data, form } = $props();
	const { initPosts, initCategories } = data;

	if (browser) {
		if (form?.message) alert(`${form?.message}`);
	}
</script>

<Head title="Blog" />
<Blog title="All Posts" {initPosts} {initCategories} searchBox />
