<script lang="ts">
	import { IconGithub, IconMail } from '$lib';
	let { url = '', icon = '', popup = true } = $props();
</script>

{#if url}
	<a
		class="hover:text-primary-600 flex gap-x-2 text-gray-500 transition"
		href={url || '#'}
		target={popup ? '_blank' : ''}
		rel="noreferrer"
	>
		<span class="sr-only">{icon}</span>
		{#if icon === 'github'}
			<IconGithub />
		{:else}
			<IconMail />
		{/if}
	</a>
{/if}
