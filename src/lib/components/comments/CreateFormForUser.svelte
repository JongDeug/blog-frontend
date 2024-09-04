<script lang="ts">
	import { createParentCommentForUser, createChildCommentForUser } from '$lib/utils/api/request/comment';

	export let parentCommentId = '';
	export let postId;

	let content = '';

	const handleClick = async () => {
		try {
			if (!!parentCommentId) {
				await createChildCommentForUser({ parentCommentId, content });
			} else {
				await createParentCommentForUser({ postId, content });
			}
		} catch (err) {
			alert(`${err}`);
		}
	};
</script>

<div class="mt-4">
	<div class="mb-4">
		<textarea
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
			rows="4"
			placeholder="여기에 댓글을 작성하세요"
			bind:value={content}
		></textarea>
	</div>

	<button
		on:click={handleClick}
		class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
		완료
	</button>
</div>