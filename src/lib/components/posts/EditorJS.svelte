<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Table from '@editorjs/table';
	// @ts-ignore
	import Embed from '@editorjs/embed';
	import Quote from '@editorjs/quote';
	// @ts-ignore
	import Undo from 'editorjs-undo';
	// @ts-ignore
	import Code from '@7polo/editorjs-code2';
	import Delimiter from '@editorjs/delimiter';
	// @ts-ignore
	import Checklist from '@editorjs/checklist';
	import List from '@editorjs/list';
	// @ts-ignore
	import Warning from '@editorjs/warning';
	// @ts-ignore
	import Marker from '@editorjs/marker';
	import InlineCode from '@editorjs/inline-code';
	import ImageTool from '@editorjs/image';
	// @ts-ignore
	import Paragraph from '@editorjs/paragraph';
	import { uploadImage } from '$lib/utils/api/request/post';

	export let data;
	export let read = false;

	const dispatch = createEventDispatcher();

	let editor: any;
	let tools = {
		header: {
			class: Header
		},
		embed: Embed,
		quote: Quote,
		code: {
			class: Code,
			config: {
				defaultTheme: 'okaidia',
				defaultLanguage: 'javascript'
			}
		},
		delimiter: Delimiter,
		table: Table,
		list: {
			class: List,
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
			if (read) {
				editor = new EditorJS({
					holder: 'editorjs',
					readOnly: true,
					// @ts-ignore
					tools,
					data,
					onReady: () => {
						const undo = new Undo({ editor });
						undo.initialize(data);
					}
				});
			} else {
				editor = new EditorJS({
					holder: 'editorjs',
					autofocus: true,
					placeholder: '내용을 입력해주세요!',
					// @ts-ignore
					tools,
					data,
					onReady: () => {
						const undo = new Undo({ editor });
						undo.initialize(data);
					}
				});
			}
		}
	);

	const handleClick = async () => {
		const savedData = await editor.save();
		dispatch('submit', { savedData });
	};
</script>

<slot />
{#if !read}
	<div id="editorjs" class="prose dark:prose-dark" /> <!--lg:prose-xl 로 조정 가능-->
	<div class="flex justify-end">
		<button type="submit" on:click={handleClick} class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">확인
		</button>
	</div>
{:else}
	<div id="editorjs" class="prose dark:prose-dark max-w-full" /> <!--lg:prose-xl 로 조정 가능-->
{/if}
