<script lang="ts">
	// 브라우저 제목 헤드
	import { config } from '$lib';

	const { title } = $props();
</script>

<svelte:head>
	<title>{title} | {config.title}</title>
	<meta name="description" content={config.description} />
	<meta name="author" content={config.author} />
</svelte:head>
