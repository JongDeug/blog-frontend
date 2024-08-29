<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { PUBLIC_URL } from '$env/static/public';
	import EditorJS, { type ToolConstructable, type ToolSettings } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Table from '@editorjs/table';
	import Embed from '@editorjs/embed';
	import Quote from '@editorjs/quote';
	import Code from '@editorjs/code';
	import List from '@editorjs/list';
	import LinkTool from '@editorjs/link';
	import Delimiter from '@editorjs/delimiter';
	import Checklist from '@editorjs/checklist';
	import NestedList from '@editorjs/nested-list';
	import Warning from '@editorjs/warning';
	import Marker from '@editorjs/marker';
	import InlineCode from '@editorjs/inline-code';
	// import Header from 'editorjs-header-with-anchor';
	import ImageTool from '@editorjs/image';

	export let method;
	const dispatch = createEventDispatcher();

	export let data;
	let editor: any;
	let tools = {
		header: {
			class: Header
		},
		embed: Embed,
		quote: Quote,
		code: Code,
		delimiter: Delimiter,
		table: Table,
		list: {
			class: NestedList,
			inlineToolbar: true,
			config: {
				defaultStyle: 'unordered'
			}
		},
		checklist: Checklist,
		warning: Warning,
		Marker: {
			class: Marker
		},
		inlineCode: {
			class: InlineCode
		},
		image: {
			class: ImageTool,
			config: {
				endpoints: {
					byFile: 'http://localhost:8008/uploadFile', // 업로드 장소인데 uploader 로 변경하자.
					byUrl: `${PUBLIC_URL}/uploads` // 백엔드 이미지 저장소
				}
				// uploader: {
				// 	uploadByFile(file) {
				// 		return { success: 1, file: { url: data } };
				// 	}
				// }
			}
		}
	};

	onMount(() => {
		editor = new EditorJS({
			holder: 'editorjs',
			autofocus: true,
			placeholder: '내용을 입력해주세요!',
			tools,
			// readOnly: true, // 나중에 써먹자
			data
		});
	});

	const onSave = () => {
		editor.save().then((savedData: any) => {
			dispatch('save', savedData);
		});
	};
</script>

<div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
	<div>
		<h1 class="text-2xl font-semibold mb-6">게시글 작성</h1>

		<div id="editorjs" class="prose lg:prose-xl" />

		<!-- 태그 입력 -->
		<div class="mb-4">
			<label for="tags" class="block text-sm font-medium text-gray-700 mb-1">태그</label>
			<input type="text" id="tags"
						 class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						 placeholder="태그를 입력하세요 (쉼표로 구분)" />
		</div>

		<!-- 카테고리 선택 -->
		<div class="mb-4">
			<label for="category" class="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
			<select id="category"
							class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
				<option value="" disabled selected>카테고리를 선택하세요</option>
				<option>잉</option>
			</select>
		</div>

		<!-- 이전 게시글 링크 -->
		<div class="mb-4">
			<label for="previous-post" class="block text-sm font-medium text-gray-700 mb-1">이전 게시글 링크</label>
			<input type="url" id="previous-post"
						 class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						 placeholder="이전 게시글 URL을 입력하세요" />
		</div>

		<!-- 다음 게시글 링크 -->
		<div class="mb-4">
			<label for="next-post" class="block text-sm font-medium text-gray-700 mb-1">다음 게시글 링크</label>
			<input type="url" id="next-post"
						 class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						 placeholder="다음 게시글 URL을 입력하세요" />
		</div>

		<!-- Draft 체크 박스 -->
		<div class="mb-4 flex items-center">
			<input
				type="checkbox"
				id="draft"
				class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
			/>
			<label for="draft" class="ml-2 text-sm font-medium text-gray-700">Draft</label>
		</div>

		<button on:click={onSave} class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">게시글 작성</button>
	</div>
</div>
