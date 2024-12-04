<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { ToastUI } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';

	const {
		title,
		method,
		initPost,
		initCategories
	}: {
		title: string;
		method: 'PATCH' | 'POST';
		initPost?: Post;
		initCategories: Category[];
	} = $props();

	let toastEditorRef: any;

	// 게시글 수정에 필요
	let postTitle = $state(initPost?.title ?? '');
	let draft = $state(initPost?.draft ?? true);
	let category = $state(initPost?.category.name ?? '');
	let tags = $state(initPost?.tags.map((x: Tag) => x.name).join(',') ?? '');
	let prevId = $state(initPost?.prevId ?? '');
	let nextId = $state(initPost?.nextId ?? '');
	let summary = $state(initPost?.summary ?? '');
	let content = $state(initPost?.content ?? '');

	const postForm: SubmitFunction = () => {
		return ({ result, update }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			} else if (result.type === 'failure') {
				alert(`${result.data?.message}`);
			}
			update({ reset: false });
		};
	};
</script>

<div
	class="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
>
	<form method="POST" action={method === 'POST' ? '?/create' : '?/update'} use:enhance={postForm}>
		<h1 class="mb-6 text-3xl text-gray-900 dark:text-white">{title}</h1>

		<!-- 임시 저장 체크 박스 -->
		<div class="mb-4 flex items-center justify-end">
			<input
				type="checkbox"
				id="draft"
				name="draft"
				bind:checked={draft}
				class="form-checkbox h-5 w-5 bg-gray-200 text-blue-600 transition duration-150 ease-in-out dark:bg-gray-700"
			/>
			<label for="draft" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
				>임시 저장</label
			>
		</div>

		<!-- 제목 입력 -->
		<div class="mb-4">
			<label for="title" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>제목</label
			>
			<input
				type="text"
				id="title"
				name="title"
				bind:value={postTitle}
				class="w-full rounded border bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				placeholder="게시글 제목을 입력하세요"
			/>
		</div>

		<!-- 카테고리 선택 -->
		<div class="relative mb-4">
			<label for="category" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>카테고리</label
			>
			<select
				id="category"
				name="category"
				bind:value={category}
				class="block w-64 rounded border bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
			>
				<option value="" disabled selected>카테고리를 선택하세요</option>
				{#each initCategories as category}
					<option value={category.name}>{category.name}</option>
				{/each}
			</select>
		</div>

		<!-- 태그 입력 -->
		<div class="mb-4">
			<label for="tags" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>태그</label
			>
			<input
				type="text"
				id="tags"
				name="tags"
				bind:value={tags}
				class="w-full rounded border bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				placeholder="태그를 입력하세요 (쉼표로 구분)"
			/>
		</div>

		<div class="mb-4 flex gap-2">
			<div class="w-1/2">
				<!-- 이전 게시글 링크 -->
				<label for="prevId" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
					>이전 게시글 링크</label
				>
				<input
					id="prevId"
					name="prevId"
					bind:value={prevId}
					class="w-full rounded border bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
					placeholder="이전 게시글 Id를 입력하세요"
				/>
			</div>

			<div class="w-1/2">
				<!-- 다음 게시글 링크 -->
				<label for="nextId" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
					>다음 게시글 링크</label
				>
				<input
					id="nextId"
					name="nextId"
					bind:value={nextId}
					class="w-full rounded border bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
					placeholder="다음 게시글 Id를 입력하세요"
				/>
			</div>
		</div>

		<!-- 게시글 요약 입력 -->
		<div class="mb-4">
			<label for="summary" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>요약</label
			>
			<textarea
				id="summary"
				name="summary"
				bind:value={summary}
				placeholder="게시글 요약 내용을 작성해주세요"
				class="w-full rounded border bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
			></textarea>
		</div>

		<!-- 문서 편집 -->
		<div>
			<label for="editor" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>문서 편집</label
			>
			<ToastUI bind:this={toastEditorRef} {content} />
			<input type="hidden" name="content" value={content} />
			<div class="mt-5 flex justify-end">
				<!-- 버튼 클릭 시 편집기에 있는 내용을 content에 채워 form 요청 -->
				<button
					onclick={() => {
						content = toastEditorRef.getContent();
					}}
					type="submit"
					class="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
					>확인
				</button>
			</div>
		</div>
	</form>
</div>
