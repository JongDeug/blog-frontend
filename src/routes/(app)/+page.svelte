<script lang="ts">
	import { Head } from '$lib';
	import Blog from '$lib/components/Blog.svelte';
	import type { PageData } from './$types';

	// [isLogin]: hooks.server.ts => layout.server.ts => layout.ts => layout.svelte => page.svelte
	// [initPosts]: page.ts => page.svelte
	const { data }: { data: PageData } = $props();
	const { initPosts } = data;
</script>

<Head title="Home" />

<Blog {initPosts} isHome={true} />
