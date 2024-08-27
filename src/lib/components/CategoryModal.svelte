<!-- CategoryModal.svelte -->
<script lang="ts">
	import { isModalOpen, toggleModal } from '$lib/stores/modal';

	let createCategory = '';

	function handleBackgroundClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			toggleModal();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleModal();
		}
	}
</script>

{#if $isModalOpen}
	<div
		class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
		on:click={handleBackgroundClick}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	>
		<div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
			<h2 class="text-xl font-semibold mb-4">카테고리 관리</h2>

			<div class="mb-4">
				<label for="create" class="block text-sm font-medium mb-2">카테고리 추가</label>
				<input id="create" type="text" bind:value={createCategory} placeholder="새 카테고리 이름"
							 class="w-full border rounded px-3 py-2 mb-2">
				<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">추가</button>
			</div>

			<div class="mb-4">
				<label for="update" class="block text-sm font-medium mb-2">카테고리 수정</label>
				<select id="update" class="w-full border rounded px-3 py-2 mb-2">
					<option>카테고리 선택</option>
					<!-- 카테고리 옵션들 -->
				</select>
				<input type="text" placeholder="새 이름 입력" class="w-full border rounded px-3 py-2 mb-2">
				<button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">수정</button>
			</div>

			<div class="mb-4">
				<label for="delete" class="block text-sm font-medium mb-2">카테고리 삭제</label>
				<select id="delete" class="w-full border rounded px-3 py-2 mb-2">
					<option>카테고리 선택</option>
					<!-- 카테고리 옵션들 -->
				</select>
				<button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">삭제</button>
			</div>

			<div class="text-right">
				<button on:click={toggleModal} class="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">닫기
				</button>
			</div>
		</div>
	</div>
{/if}