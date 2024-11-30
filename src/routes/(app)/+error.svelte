<script>
	import { page } from '$app/stores';
</script>

<div class="mx-auto w-64 pt-32 text-center">
	{#if $page.status === 404}
		<h1 class="text-outline text-9xl font-bold">404</h1>
		<p class="text-2xl font-semibold">{$page.error?.message}</p>
	{:else}
		<h1 class="text-9xl font-bold">Error {$page.status}</h1>
		<p class="text-2xl font-semibold">{$page.error?.message}</p>
	{/if}
	<div class="pt-10">
		<a href="/" class="rounded-lg border px-6 py-2 text-xl font-semibold">돌아가기</a>
	</div>
</div>
