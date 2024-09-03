<script>
	import { updateCommentForGuest } from '$lib/utils/api/request/comment';

	export let commentId;
	let content = '';
	let password = '';

	const handleClick = async () => {
		try {
			await updateCommentForGuest(commentId, { content, password });
		} catch (err) {
			alert(`${err}`);
		}
	};
</script>

<div class="my-4">
	<textarea
		bind:value={content}
		class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
		rows="3"
		placeholder="수정할 내용을 입력하세요"></textarea>
	<input
		bind:value={password}
		type="password"
		class="w-full p-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
		placeholder="비밀번호" />
	<button
		on:click={handleClick}
		class="mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
		완료
	</button>
</div>