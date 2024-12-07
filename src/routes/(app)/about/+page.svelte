<script>
	import { Head, SocialIcon, Title, config } from '$lib';
	import DOMPurify from 'dompurify';

	const cleanContent = DOMPurify.sanitize(config.about);
</script>

<Head title="About" />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<Title h2 title="About" />
	</div>
	<div class="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
		<div class="flex flex-col items-center py-6">
			<img src={config.siteLogo} alt="logo" class="h-64 w-64 rounded" />
			<div class="flex space-x-2 pt-4">
				<SocialIcon icon="mail" url={`mailto:${config.email}`} />
				<SocialIcon icon="github" url={config.github.url} />
			</div>
		</div>
		<div class="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
			{@html cleanContent}
		</div>
	</div>
	<div class="space-y-2 py-8 md:space-y-5">
		<Title h2 title="Goals" />
		<div class="prose grid gap-5 dark:prose-dark">
			{#each config.goals as goal}
				<div class="flex-row space-x-3 lg:flex">
					{goal}
				</div>
			{/each}
		</div>
	</div>
</div>
