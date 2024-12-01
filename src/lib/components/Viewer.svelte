<script lang="ts">
	import { onMount } from 'svelte';
	// import '@toast-ui/editor/dist/toastui-editor-viewer.css';
	import delay from '$lib/utils/delay';

	const { content } = $props();

	// Dynamically importing
	onMount(async () => {
		await delay(500);

		// @ts-ignore
		let Viewer = (await import('@toast-ui/editor/dist/toastui-editor-viewer')).default;

		const viewer = new Viewer({
			el: document.querySelector('#viewer'),
			initialValue: content
		});
	});
</script>

<div id="viewer" class="prose text-xl lg:prose-xl"></div>
