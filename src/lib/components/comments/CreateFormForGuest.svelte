<script>
	import { createChildCommentForGuest, createParentCommentForGuest } from '$lib/utils/api/request/comment';

	export let parentCommentId = '';
	export let postId;

	let nickName = '';
	let email = '';
	let password = '';
	let content = '';

	const handleClick = async () => {
		try {
			if (!!parentCommentId) {
				await createChildCommentForGuest({ parentCommentId, content, nickName, email, password });
			} else {
				await createParentCommentForGuest({ postId, content, nickName, email, password });
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

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
		<input
			bind:value={nickName}
			type="text"
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
			placeholder="닉네임" />

		<input
			bind:value={email}
			type="email"
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
			placeholder="이메일(댓글 알림)" />
	</div>

	<div class="mb-4">
		<input
			bind:value={password}
			type="password"
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
			placeholder="비밀번호(수정 및 삭제 시 사용)" />
	</div>

	<button
		on:click={handleClick}
		class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
		완료
	</button>
</div>