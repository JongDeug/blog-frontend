<script lang="ts">
	import debounce from 'lodash/debounce';

	let { value = $bindable(), searchPosts } = $props();
</script>

<div class="relative mb-2 mt-2">
	<input
		bind:value
		oninput={debounce(searchPosts, 500)}
		id="search"
		name="search"
		aria-label="Search posts"
		type="text"
		placeholder="게시글 검색 (정렬 적용되지 않음)"
		class="block w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
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
