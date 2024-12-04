<!-- Expected Error 잡아줌 -->
<script>
	import { page } from '$app/stores';
</script>

<div class="mx-auto w-full pt-32 text-center">
	<h1 class="text-9xl font-bold">{$page.status}</h1>
	<p class="text-2xl font-semibold">{$page.error?.message}</p>
	<div class="pt-10">
		<a href="/" class="rounded-lg border px-6 py-2 text-xl font-semibold">돌아가기</a>
	</div>
</div>
