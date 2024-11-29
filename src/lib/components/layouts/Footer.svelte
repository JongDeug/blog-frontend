<script>
	import { config } from '$lib';
	import SocialIcon from '$lib/components/SocialIcon.svelte';

	let year = new Date().getFullYear();
</script>

<footer>
	<div class="mt-16 flex flex-col items-center gap-2 border-t pt-6">
		<div class="mb-3 flex space-x-2">
			<SocialIcon icon="mail" url="{config.email ? `mailto:${config.email}` : ''}," />
			<SocialIcon icon="github" url="{config.github}," />
		</div>
		<div class="mb-4 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
			<a href="/">{config.title}</a> &nbsp; • &nbsp; © {year}
			{config.author} &nbsp; • &nbsp; <a href="/rss.xml">RSS Feed</a>
		</div>
	</div>
</footer>
