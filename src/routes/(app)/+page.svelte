<script lang="ts">
	import { config, Head, Home, Title } from '$lib';
	import type { PageData } from './$types';

	// [isLogin]: layout.server.ts => layout.ts => layout.svelte => page.svelte
	// [posts]: page.ts => page.svelte
	const { data }: { data: PageData } = $props();
	const { isLogin, posts } = data;
</script>

<Head title="Main" />

<div class="pt-12">
	<Title title="꾸벅" />
	<p class="prose-xl text-xl text-gray-800 dark:text-gray-400">
		{@html config.intro}
	</p>
</div>

<Home title="Latest Posts" h2 {isLogin} {posts} />
