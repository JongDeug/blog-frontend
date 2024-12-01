<script>
	import { onMount } from 'svelte';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import delay from '$lib/utils/delay';

	// @ts-ignore
	let editor;

	// Dynamically importing
	onMount(async () => {
		await delay(1000);

		// @ts-ignore
		let Editor = (await import('@toast-ui/editor')).default;

		editor = new Editor({
			el: document.querySelector('#editor'),
			height: '500px',
			initialValue: 'content',
			initialEditType: 'wysiwyg'
		});
	});
</script>

<div id="editor" class="prose lg:prose-xl"></div>

<button
	onclick={() => {
		console.log(editor.getMarkdown());
	}}>확인</button
>
