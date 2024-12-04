<script lang="ts">
	// [isLogin]: layout.server.ts => layout.ts => layout.svelte => page.svelte
	// [posts]: page.ts => page.svelte
	// const { data }: { data: PageData } = $props();

	let count = $state(1);
	let hi = $derived(count * 10); // 얘는 call by reference 동작
	// let hi = count * 10; // 얘는 call by value 동작
	$effect(() => {
		// effect안에 들어왔을 때 반응형 변수가 들어왔을 때 동작
		// hi;
		// count;
		console.log('hi');
	});
</script>

{hi}
{count}

<button onclick={() => count++}> hi </button>
