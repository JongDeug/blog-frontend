<script lang="ts">
	import { Head, BlogFullView } from '$lib';

	const { data } = $props();
	const { initCategories } = data;
</script>

<Head title="Blog" />
<BlogFullView title="All Posts" {initCategories} />
