<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fade } from 'svelte/transition';

	const { initCategories, toggleModal }: { initCategories: Category[]; toggleModal: Function } =
		$props();

	const deleteCategory: SubmitFunction = ({ cancel }) => {
		if (confirm('정말로 삭제하시겠습니까?')) {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					toggleModal();
					update();
				} else if (result.type === 'failure') {
					alert(`${result?.data?.message}`);
				}
			};
		}
		cancel();
	};

	const createOrUpdateCategory: SubmitFunction = () => {
		return ({ result, update }) => {
			if (result.type === 'success') {
				toggleModal();
				update();
			} else if (result.type === 'failure') {
				alert(`${result?.data?.message}`);
			}
		};
	};
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0"
	onclick={(event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			toggleModal();
		}
	}}
	onkeydown={(event: KeyboardEvent) => {
		if (event.key === 'Enter') toggleModal();
	}}
	role="button"
	tabindex="0"
>
	<div
		class="w-full max-w-[90%] rounded-lg border bg-white p-4 shadow-lg sm:max-w-md sm:p-6 dark:bg-gray-800"
	>
		<h2 class="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">카테고리 관리</h2>

		<form
			method="POST"
			action="/blog?/createCategory"
			class="mb-3 sm:mb-4"
			use:enhance={createOrUpdateCategory}
		>
			<label for="newCategory" class="mb-1 block text-sm font-medium sm:mb-2">카테고리 추가</label>
			<input
				id="newCategory"
				name="newCategory"
				type="text"
				placeholder="새 카테고리 이름"
				class="mb-2 w-full rounded border px-2 py-1 text-sm text-gray-700 sm:px-3 sm:py-2 sm:text-base"
			/>
			<button
				type="submit"
				class="rounded-md border border-blue-500 px-3 py-1 text-sm font-medium text-blue-500 hover:font-extrabold focus:outline-none focus:ring-2 focus:ring-blue-500"
				>추가
			</button>
		</form>

		<form
			class="mb-3 sm:mb-4"
			method="POST"
			action="/blog?/updateCategory"
			use:enhance={createOrUpdateCategory}
		>
			<label for="targetCategory" class="mb-1 block text-sm font-medium sm:mb-2"
				>카테고리 수정</label
			>
			<select
				id="targetCategory"
				name="targetCategory"
				class="mb-2 w-full rounded border px-2 py-1 text-sm text-gray-700 sm:px-3 sm:py-2 sm:text-base"
			>
				<option value="" disabled selected>카테고리를 선택하세요</option>
				{#each initCategories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			<input
				name="newCategory"
				type="text"
				placeholder="새 이름 입력"
				class="mb-2 w-full rounded border px-3 py-1 text-sm text-gray-700 sm:px-3 sm:py-2 sm:text-base"
			/>
			<button
				type="submit"
				class="rounded-md border border-green-500 px-3 py-1 text-sm font-medium text-green-500 hover:font-extrabold focus:outline-none focus:ring-2 focus:ring-green-500"
			>
				수정
			</button>
		</form>

		<form
			class="mb-3 sm:mb-4"
			method="POST"
			action="/blog?/deleteCategory"
			use:enhance={deleteCategory}
		>
			<label for="targetCategory" class="mb-1 block text-sm font-medium sm:mb-2"
				>카테고리 삭제</label
			>
			<select
				id="targetCategory"
				name="targetCategory"
				class="mb-2 w-full rounded border px-3 py-1 text-sm text-gray-700 sm:px-3 sm:py-2 sm:text-base"
			>
				<option value="" disabled selected>카테고리를 선택하세요</option>
				{#each initCategories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			<button
				type="submit"
				class="rounded-md border border-red-500 px-3 py-1 text-sm font-medium text-red-500 hover:font-extrabold focus:outline-none focus:ring-2 focus:ring-red-500"
			>
				삭제
			</button>
		</form>

		<div class="text-right">
			<button
				onclick={() => toggleModal()}
				class="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
			>
				닫기
			</button>
		</div>
	</div>
</div>
