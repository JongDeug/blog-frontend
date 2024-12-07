<script lang="ts">
	import { BlogOverview, Head } from '$lib';

	const { data } = $props();
	const { initPosts } = data;
</script>

<Head title="Home" />
<BlogOverview title="꾸벅" {initPosts} />
