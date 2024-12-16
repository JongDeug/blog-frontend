<script lang="ts">
	import { onMount } from 'svelte';
	import { delay } from '$lib';
	import '@toast-ui/editor/dist/toastui-editor.css';
	// colorSyntax
	import 'tui-color-picker/dist/tui-color-picker.css';
	// fontSize
	import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';
	import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
	// codeSyntaxHighlight
	import 'prismjs/themes/prism.css';
	import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-c.js'; // 원하는 언어 추가
	import { PUBLIC_API_URL } from '$env/static/public';

	let editor: any;

	const { content } = $props();

	// Dynamically importing
	onMount(async () => {
		await delay(500);

		// @ts-ignore
		let Editor = (await import('@toast-ui/editor')).default;

		let colorSyntax = (await import('@toast-ui/editor-plugin-color-syntax')).default;
		let fontSize = (await import('tui-editor-plugin-font-size')).default;
		let codeSyntaxHighlight = (await import('@toast-ui/editor-plugin-code-syntax-highlight'))
			.default;

		editor = new Editor({
			el: document.querySelector('#editor'),
			previewStyle: 'vertical',
			height: '500px',
			initialValue: content ?? '',
			initialEditType: 'wysiwyg',
			plugins: [colorSyntax, fontSize, [codeSyntaxHighlight, { highlighter: Prism }]],
			hooks: {
				// @ts-ignore
				async addImageBlobHook(blob, callback) {
					const formData = new FormData();
					formData.append('image', blob);

					const response = await fetch(`/blog/form/image`, {
						method: 'POST',
						body: formData
					});
					const data = await response.json();

					if (!response.ok) {
						return alert(`${data.message}`);
					}

					// 에디터에 업로드
					const imageUrl = `${PUBLIC_API_URL}/uploads/${data.filename}`;
					callback(imageUrl);
				}
			}
		});
	});

	export const getContent = () => {
		return editor.getHTML();
	};
</script>

<div id="editor"></div>
