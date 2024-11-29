<!-- CategoryModal.svelte -->
<!-- <script lang="ts">
	import { isModalOpen, toggleModal } from '$lib/utils/stores/modal';
	import { createCategory, deleteCategory, updateCategory } from '$lib/utils/api/request/category';

	export let categories: CategoryType[];

	let bindNameCreate = '';
	let bindNameUpdate = '';
	let bindSelectedNameDelete = '';
	let bindSelectedNameUpdate = '';

	const handleBackgroundClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			toggleModal();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			toggleModal();
		}
	};
</script>

{#if $isModalOpen.value}
	<div
		class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4 sm:p-0"
		on:click={handleBackgroundClick}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	>
		<div class="rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md border bg-white dark:bg-gray-800">
			<h2 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">카테고리 관리</h2>

			<div class="mb-3 sm:mb-4">
				<label for="create" class="block text-sm font-medium mb-1 sm:mb-2">카테고리 추가</label>
				<input id="create" type="text" bind:value={bindNameCreate} placeholder="새 카테고리 이름"
							 class="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 mb-2 text-gray-700 text-sm sm:text-base">
				<button
					class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					on:click={() => createCategory(bindNameCreate)}
				>추가
				</button>
			</div>

			<div class="mb-3 sm:mb-4">
				<label for="update" class="block text-sm font-medium mb-1 sm:mb-2">카테고리 수정</label>
				<select id="update" bind:value={bindSelectedNameDelete}
								class="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 mb-2 text-sm sm:text-base text-gray-700">
					<option value="" disabled selected>카테고리를 선택하세요</option>
					{#each categories as category}
						<option value={category.name}>{category.name}</option>
					{/each}
				</select>
				<input type="text" bind:value={bindNameUpdate} placeholder="새 이름 입력"
							 class="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 mb-2 text-sm sm:text-base text-gray-700">
				<button on:click={() => updateCategory(bindSelectedNameDelete, bindNameUpdate)}
								class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
					수정
				</button>
			</div>

			<div class="mb-3 sm:mb-4">
				<label for="delete" class="block text-sm font-medium mb-1 sm:mb-2">카테고리 삭제</label>
				<select id="delete" bind:value={bindSelectedNameUpdate}
								class="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 mb-2 text-sm sm:text-base text-gray-700">
					<option value="" disabled selected>카테고리를 선택하세요</option>
					{#each categories as category}
						<option value={category.name}>{category.name}</option>
					{/each}
				</select>
				<button on:click={() => deleteCategory(bindSelectedNameUpdate)}
								class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
					삭제
				</button>
			</div>

			<div class="text-right">
				<button on:click={() => toggleModal()}
								class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
					닫기
				</button>
			</div>
		</div>
	</div>
{/if} -->
