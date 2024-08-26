<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let searchQuery = '';
	let debounceTimeout: NodeJS.Timeout;
	const dispatch = createEventDispatcher();

	async function handleInput(event: any) {
		searchQuery = event.target.value;
		clearTimeout(debounceTimeout);
		// P. 반응형 변수 때문에 api 요청의 빈도가 너무 잦음.
		// I. Debounce 는 자주 사용 되는 이벤트나 함수 들의 실행되는 빈도를 줄여서, 성능 상의 유리함을 가져오기 위한 개념이다. => 이걸로 해결
		debounceTimeout = setTimeout(() => {
			dispatch('input', searchQuery);
		}, 300);
	}
</script>

<div class="relative mb-2">
	<input
		bind:value={searchQuery}
		on:input={handleInput}
		id="search"
		name="search"
		aria-label="Search posts"
		type="text"
		placeholder="Search posts"
		class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
	/>
	<svg
		class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width={2}
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
</div>