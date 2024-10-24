<script>
	import { page } from '$app/stores';
</script>

<div class="pt-32 mx-auto w-64 text-center">
	{#if $page.status === 404 }
		<h1 class="text-9xl font-bold text-outline">404</h1>
		<p class="text-2xl font-semibold">{$page.error?.message}</p>
	{:else}
		<h1 class="text-9xl font-bold">Error {$page.status}</h1>
		<p class="text-2xl font-semibold">{$page.error?.message}</p>
	{/if}
	<div class="pt-10">
		<a href="/" class="text-xl font-semibold border py-2 px-6 rounded-lg">돌아가기</a>
	</div>
</div>
