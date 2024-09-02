<script lang="ts">
	import EditorJS from '$lib/components/posts/EditorJS.svelte';
	import { createPost, updatePost } from '$lib/utils/api/request/post';

	export let title;
	export let categories;
	export let method;
	export let post: PostType | null;

	let content;
	if (post?.content) {
		content = JSON.parse(post.content);
	} else {
		content = {
			'blocks': [
				{
					'type': 'header',
					'data': {
						'text': 'Title',
						'level': 1
					}
				}
			]
		};
	}

	let bindSummary: string | undefined = post?.summary;
	let bindDraft: boolean = !!post?.draft;
	let bindTags: string | undefined = post?.tags?.join(', ');
	let bindCategory: string | undefined = post?.categoryName;
	let bindPrev: string | undefined = post?.prev;
	let bindNext: string | undefined = post?.next;

	const onSubmit = async (event: CustomEvent) => {
		try {
			const { savedData } = event.detail;

			// I. 데이터 추출 및 가공
			let title = '';
			let images: string[] = [];
			savedData['blocks'].forEach((obj: any) => {
				if (obj.type === 'header') {
					if (obj.data.level === 1) title = obj.data.text;
				} else if (obj.type === 'image') images.push(obj.data.file.url);
			});
			let tags = bindTags?.split(',').map(tag => tag.trim());

			if (method === 'POST') {
				await createPost({
					title,
					images,
					draft: bindDraft,
					tags,
					summary: bindSummary,
					content: JSON.stringify(savedData),
					category: bindCategory,
					prev: bindPrev,
					next: bindNext
				});
			} else if (method === 'PATCH') {
				const id = post?.id;
				if (!id) return alert('수정하려는 게시글 id가 없습니다');
				await updatePost(id, {
					title,
					images,
					draft: bindDraft,
					tags,
					summary: bindSummary,
					content: JSON.stringify(savedData),
					category: bindCategory,
					prev: bindPrev,
					next: bindNext
				});
			}
		} catch (err) {
			alert(err);
		}
	};
</script>

<div class="max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow-lg dark:border">
	<div>
		<h1 class="text-4xl">{title}</h1>

		<EditorJS data={content} on:submit={onSubmit}>
			<!-- Draft 체크 박스 -->
			<div class="mb-4 flex items-center justify-end">
				<input
					type="checkbox"
					id="draft"
					bind:checked={bindDraft}
					class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out bg-gray-200"
				/>
				<label for="draft" class="ml-2 text-sm font-medium text-gray-700">Draft</label>
			</div>

			<!-- 게시글 요약 입력 -->
			<div class="mb-4">
				<label for="summary" class="block text-sm font-medium text-gray-700 mb-1">요약</label>
				<textarea
					bind:value={bindSummary}
					placeholder="게시글 요약 내용을 작성해주세요"
					id="summary"
					class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200" />
			</div>

			<!-- 태그 입력 -->
			<div class="mb-4">
				<label for="tags" class="block text-sm font-medium text-gray-700 mb-1">태그</label>
				<input type="text" id="tags" bind:value={bindTags}
							 class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
							 placeholder="태그를 입력하세요 (쉼표로 구분)" />
			</div>

			<!-- 카테고리 선택 -->
			<div class="mb-4">
				<label for="category" class="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
				<select id="category" bind:value={bindCategory}
								class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200">
					<option value="" disabled selected>카테고리를 선택하세요</option>
					{#each categories as category}
						<option value={category.name}>{category.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex mb-4 gap-2">
				<div>
					<!-- 이전 게시글 링크 -->
					<label for="previous-post" class="block text-sm font-medium text-gray-700 mb-1">이전 게시글 링크</label>
					<input id="previous-post" bind:value={bindPrev}
								 class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
								 placeholder="이전 게시글 Id를 입력하세요" />
				</div>

				<div>
					<!-- 다음 게시글 링크 -->
					<label for="next-post" class="block text-sm font-medium text-gray-700 mb-1">다음 게시글 링크</label>
					<input id="next-post" bind:value={bindNext}
								 class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
								 placeholder="다음 게시글 Id를 입력하세요" />
				</div>
			</div>
		</EditorJS>
	</div>
</div>
