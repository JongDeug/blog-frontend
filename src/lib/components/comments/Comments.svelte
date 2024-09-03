<script lang="ts">
	import EditFormForGuest from '$lib/components/comments/EditFormForGuest.svelte';
	import EditFormForUser from '$lib/components/comments/EditFormForUser.svelte';
	import CreateFormForGuest from '$lib/components/comments/CreateFormForGuest.svelte';
	import CreateFormForUser from '$lib/components/comments/CreateFormForUser.svelte';
	import { replyFormVisible, showReplyForm, editFormVisible, showEditForm } from '$lib/utils/stores/commentForm';
	import { deleteCommentForGuest, deleteCommentForUser } from '$lib/utils/api/request/comment';
	import PwdModal from '$lib/components/PwdModal.svelte';
	import { toggleModal } from '$lib/utils/stores/modal';

	export let comments: ArrayLike<CommentType> = [];
	export let isLogin;
	export let info;
	export let postId;

	const handleDeleteForUser = async (commentId: string) => {
		try {
			const userConfirm = confirm('댓글을 삭제하시겠습니까?');
			if (userConfirm) {
				await deleteCommentForUser(commentId);
			}
		} catch (err) {
			alert(`${err}`);
		}
	};

	const handleDeleteForGuest = async (event: CustomEvent) => {
		try {
			const { password, commentId } = event.detail;
			const guestConfirm = confirm('댓글을 삭제하시겠습니까?');
			if (guestConfirm) await deleteCommentForGuest(commentId, password.trim());
		} catch (err) {
			alert(`${err}`);
		}
	};
</script>

<!-- 댓글 목록 -->
<div class="pt-6 pb-6 text-gray-700 dark:text-gray-300 border-t">
	{#each comments as comment (comment.id)}
		<div class="mb-4 p-4 border rounded-xl">
			<div class="flex justify-between">
				<p
					class="text-lg text-gray-900 dark:text-gray-100 mb-2">{comment.author?.name ? comment.author?.name : comment.guest?.nickName}</p>
				<!-- 게스트일 경우 undefined === undefined -->
				{#if info?.role === 500 || comment.author?.name === info?.username}
					<div>
						<button
							on:click={() => {
							if(isLogin) handleDeleteForUser(comment.id);
							else toggleModal(comment.id);
						}}
							class="text-sm text-red-500 hover:underline">
							삭제
						</button>
						<span> | </span>
						<button
							on:click={() => showEditForm(comment.id)}
							class="text-sm text-primary-500 hover:underline">
							수정
						</button>
					</div>
				{/if}
			</div>
			<p class="text-gray-700 dark:text-gray-300 mb-4">{comment.content}</p>

			<!-- 댓글 수정 폼 -->
			{#if $editFormVisible === comment.id}
				{#if isLogin}
					<EditFormForUser commentId={comment.id} />
				{:else}
					<EditFormForGuest commentId={comment.id} />
				{/if}
			{/if}

			<!-- 대댓글 목록 -->
			{#if comment.childComments && comment.childComments.length > 0}
				<div class="ml-4 mt-4 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
					{#each comment.childComments as reply (reply.id)}
						<div class="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
							<div class="flex justify-between">
								<p
									class="text-sm text-gray-900 dark:text-gray-100 mb-1">{reply.author?.name ? reply.author?.name : reply.guest?.nickName}</p>
								<div>
									<button
										on:click={() => {
											if(isLogin) handleDeleteForUser(comment.id);
											else toggleModal(comment.id);
										}}
										class="text-sm text-red-500 hover:underline">
										삭제 |
									</button>
									<span> | </span>
									<button
										on:click={() => showEditForm(reply.id)}
										class="text-sm text-primary-500 hover:underline">
										수정
									</button>
								</div>
							</div>
							<p class="text-gray-700 dark:text-gray-300">{reply.content}</p>

							<!-- 대댓글 수정 폼 -->
							{#if $editFormVisible === reply.id}
								{#if isLogin}
									<EditFormForUser commentId={reply.id} />
								{:else}
									<EditFormForGuest commentId={reply.id} />
								{/if}
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
			{#if $replyFormVisible === comment.id}
				{#if isLogin}
					<CreateFormForUser {postId} parentCommentId={comment.id} />
				{:else}
					<CreateFormForGuest {postId} parentCommentId={comment.id} />
				{/if}
			{/if}
		</div>
	{/each}
</div>

<!-- 새 댓글 작성 -->
<div class="p-4 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg">
	<h3 class="text-2xl font-semibold mb-4">댓글 작성</h3>
	{#if isLogin}
		<CreateFormForUser {postId} />
	{:else}
		<CreateFormForGuest {postId} />
	{/if}
</div>

<PwdModal
	on:deleteComment={handleDeleteForGuest}
/>