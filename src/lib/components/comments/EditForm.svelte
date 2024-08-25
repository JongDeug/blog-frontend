<script>
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();
	export let id = '';
	let content = '';
	let password = '';

</script>

<div class="mt-4">
	<textarea
		bind:value={content}
		class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		rows="2"
		placeholder="수정할 내용을 입력하세요..."></textarea>
	<input
		bind:value={password}
		type="password"
		class="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		placeholder="비밀번호" />
	<button
		class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
		OK
		<!--					on:click={() => handleEdit(comment.id, newCommentContent, password)}-->
	</button>
</div>
