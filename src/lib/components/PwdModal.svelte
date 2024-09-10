<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isModalOpen, toggleModal } from '$lib/utils/stores/modal';

	const dispatch = createEventDispatcher();

	let password = '';

	const handleClick = () => {
		dispatch('deleteComment', { password, commentId: $isModalOpen.data });
	};

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
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-[90%] sm:max-w-md">
			<h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">댓글 삭제 확인</h2>
			<p class="mb-4 text-gray-600 dark:text-gray-300">
				댓글을 삭제하려면 비밀번호를 입력해주세요.
			</p>

			<input
				type="password"
				bind:value={password}
				placeholder="비밀번호 입력"
				class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 mb-4"
			/>

			<div class="flex justify-end space-x-2">
				<button
					on:click={() => toggleModal()}
					class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
				>
					취소
				</button>
				<button
					on:click={handleClick}
					class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
				>
					삭제
				</button>
			</div>
		</div>
	</div>
{/if}

