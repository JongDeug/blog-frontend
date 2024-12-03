<script lang="ts">
	import { Footer, Header } from '$lib';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import type { Snippet } from 'svelte';
	import '../../app.css';

	let { children, data }: { children: Snippet; data: PageData } = $props(); // { slot, export let data }
</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
	<div class="flex h-screen flex-col justify-between">
		<Header isLogin={data.isLogin} />
		<main class="mb-auto">
			<!-- Transition -->
			{#key data.pathname}
				<div in:fly={{ x: -5, duration: 500, delay: 500 }}>
					{@render children()}
				</div>
			{/key}
		</main>
		<Footer />
	</div>
</div>
