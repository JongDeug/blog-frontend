<script lang="ts">
	import { IconGithub, IconMail } from '$lib';
	import type { Snippet } from 'svelte';

	const {
		url = '',
		icon = '',
		popup = true,
		children
	}: { url: string; icon: string; popup?: boolean; children?: Snippet } = $props();
</script>

{#if url}
	<a
		class="flex gap-x-2 text-gray-500 transition hover:text-primary-600"
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
		{@render children?.()}
	</a>
{/if}
