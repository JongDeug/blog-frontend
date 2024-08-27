<script lang="ts">
	import EditForm from '$lib/components/comments/EditForm.svelte';
	import CreateForm from '$lib/components/comments/CreateForm.svelte';

	export let comments: ArrayLike<App.Comment> = [];

	let replyFormVisible = '';
	let editFormVisible = '';

	function showReplyForm(commentId: string) {
		replyFormVisible = replyFormVisible === commentId ? '' : commentId;
	}

	function showEditForm(commentId: string) {
		editFormVisible = editFormVisible === commentId ? '' : commentId;
	}

</script>

<!-- 댓글 목록 -->
<div class="pt-6 pb-6 text-gray-700 dark:text-gray-300 border-t">
	{#each comments as comment (comment.id)}
		<div class="mb-4 p-4 border rounded-xl">
			<div class="flex justify-between">
				<p
					class="text-lg text-gray-900 dark:text-gray-100 mb-2">{comment?.author?.name ? comment?.author?.name : comment?.guest?.nickName}</p>
				<button
					on:click={() => showEditForm(comment.id)}
					class="text-sm text-primary-500 hover:underline">
					수정
				</button>
			</div>
			<p class="text-gray-700 dark:text-gray-300 mb-4">{comment.content}</p>

			<!-- 댓글 수정 폼 -->
			{#if editFormVisible === comment.id}
				<EditForm id={comment.id} />
			{/if}

			<!-- 대댓글 목록 -->
			{#if comment.childComments && comment.childComments.length > 0}
				<div class="ml-4 mt-4 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
					{#each comment.childComments as reply (reply.id)}
						<div class="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
							<div class="flex justify-between">
								<p
									class="text-sm text-gray-900 dark:text-gray-100 mb-1">{reply?.author?.name ? reply?.author?.name : reply?.guest?.nickName}</p>
								<button
									on:click={() => showEditForm(reply.id)}
									class="text-sm text-primary-500 hover:underline">
									수정
								</button>
							</div>
							<p class="text-gray-700 dark:text-gray-300">{reply.content}</p>

							<!-- 대댓글 수정 폼 -->
							{#if editFormVisible === reply.id}
								<EditForm id={reply.id} />
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- 대댓글 작성 버튼 -->
			<button
				on:click={() => showReplyForm(comment.id)}
				class="text-sm text-primary-500 hover:underline">
				대댓글 달기
			</button>

			<!-- 대댓글 작성 폼 -->
			{#if replyFormVisible === comment.id}
				<CreateForm parentId={comment.id} />
			{/if}
		</div>
	{/each}
</div>

<!-- 새 댓글 작성 -->
<div class="p-4 text-gray-700 dark:text-gray-300 border rounded-2xl ">
	<h3 class="text-2xl font-semibold mb-4">댓글 작성</h3>
	<CreateForm />
</div>
