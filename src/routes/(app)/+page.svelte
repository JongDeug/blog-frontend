<script lang="ts">
	import { config, Head, Posts, Title } from '$lib';
	import Blog from '$lib/components/Blog.svelte';
	import type { PageData } from './$types';

	// [isLogin]: layout.server.ts => layout.ts => layout.svelte => page.svelte
	// [initPosts]: page.ts => page.svelte
	const { data }: { data: PageData } = $props();
	const { initPosts } = data;
</script>

<Head title="Home" />

<Blog {initPosts} isHome={true} />
