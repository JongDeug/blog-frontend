<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Table from '@editorjs/table';
	import Embed from '@editorjs/embed';
	import Quote from '@editorjs/quote';
	import Code from '@editorjs/code';
	import Delimiter from '@editorjs/delimiter';
	import Checklist from '@editorjs/checklist';
	import NestedList from '@editorjs/nested-list';
	import Warning from '@editorjs/warning';
	import Marker from '@editorjs/marker';
	import InlineCode from '@editorjs/inline-code';
	import ImageTool from '@editorjs/image';
	import Paragraph from '@editorjs/paragraph';
	import { uploadImage } from '$lib/utils/api/request/post';

	export let data;

	const dispatch = createEventDispatcher();
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
				uploader: {
					async uploadByFile(file: File) {
						return await uploadImage(file);
					}
				}
			}
		},
		paragraph: {
			class: Paragraph,
			inlineToolbar: true
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

	const handleClick = async () => {
		const savedData = await editor.save();
		dispatch('submit', { savedData });
	};
</script>

<slot />
<div id="editorjs" class="prose dark:prose-dark" /> <!--lg:prose-xl 로 조정 가능-->
<div class="flex justify-end">
	<button type="submit" on:click={handleClick} class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">확인
	</button>
</div>
