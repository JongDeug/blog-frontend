<script>
	import { Title, Card, Head, config } from '$lib';
</script>

<Head title="Projects" />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<Title title="Projects" subtitle="프로젝트 목록" />
	</div>
	<div class="container py-12">
		<div class=".m-4 flex flex-wrap">
			{#if !config.projects.length}
				No project found.
			{:else}
				{#each config.projects as project}
					<Card card={project} />
				{/each}
			{/if}
		</div>
	</div>
</div>
