<script lang="ts">
	import { config, Head, Home, Title } from '$lib';
	import type { PageData } from './$types';

	// [isLogin]: layout.server.ts => layout.ts => layout.svelte => page.svelte
	// [posts]: page.ts => page.svelte
	const { data }: { data: PageData } = $props();
	const { isLogin, initPosts } = data;
</script>

<Head title="Home" />

<div class="pt-12">
	<Title title="꾸벅" />
	<p class="prose-xl text-xl text-gray-800 dark:text-gray-400">
		{@html config.intro}
	</p>
</div>

<Home {isLogin} {initPosts} />
