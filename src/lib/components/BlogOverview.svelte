<script>
	import { config, PostsOverview, Title } from '$lib';

	const { initPosts, title } = $props();
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<Title {title} />
		{#if title === '꾸벅'}
			<p class="prose-xl text-xl text-gray-800 dark:text-gray-400">
				{@html config.intro}
			</p>
		{/if}
		<div class="grid gap-4 lg:grid-cols-2"></div>
	</div>

	<PostsOverview {initPosts} />
</div>
