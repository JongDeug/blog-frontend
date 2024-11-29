<script>
	let { title = 'Title', subtitle = '', h2 = false } = $props();
	let selected = h2 ? 'h2' : 'h1';
</script>

{#if title}
	<svelte:element
		this={selected}
		class="{h2
			? 'text-2xl sm:text-3xl md:text-5xl'
			: 'text-3xl sm:text-4xl md:text-6xl'} md:leading-14 font-extrabold capitalize leading-9 tracking-tight text-gray-900 sm:leading-10 dark:text-gray-100"
	>
		{title}
	</svelte:element>
{/if}

{#if subtitle}
	<p class="text-lg leading-7 text-gray-700 dark:text-gray-400">
		{subtitle}
	</p>
{/if}
