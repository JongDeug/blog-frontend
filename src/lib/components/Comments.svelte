<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { CommentForm } from '$lib';
	import { update } from '$lib/utils/fetch/category';
	import type { SubmitFunction } from '@sveltejs/kit';

	let formId = $state();

	// formId가 같으면 닫고, 다르면 여는 동작
	const showForm = (commentId: number, method: string) => {
		formId = formId === `${commentId}:${method}` ? '' : `${commentId}:${method}`;
	};

	const deleteCommentByUser: SubmitFunction = ({ cancel }) => {
		if (confirm('정말로 삭제하시겠습니까?')) {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					update();
				} else if (result.type === 'failure') {
					alert(`${result.data?.message}`);
				}
			};
		}
		cancel();
	};

	const deleteCommentByGuest: SubmitFunction = async ({ formData }) => {
		const input = prompt('비밀번호를 입력해주세요');
		const password = input?.trim();

		if (!password) {
			alert('비밀번호를 입력해주세요');
			return;
		}

		// 붙이면 알아서 넘겨짐
		formData.append('password', password);

		return async ({ result, update }) => {
			if (result.type === 'success') {
				update();
			} else if (result.type === 'failure') {
				alert(`${result.data?.message}`);
			}
		};
	};
</script>

<!-- 댓글 목록 -->
<div class="border-t pb-6 pt-6 text-gray-700 dark:text-gray-300">
	{#each $page.data.initPost.comments as comment (comment.id)}
		<div class="mb-4 rounded-xl border p-4">
			<div class="flex justify-between">
				<p
					class="mb-2 text-lg text-gray-900 dark:text-gray-100"
					class:bg-primary-200={!!comment.author?.name}
				>
					{comment.author?.name ? comment.author?.name : comment.guest?.nickName}
				</p>
				<!-- 관리자면 모두 || 유저이면서 작성자면 || 게스트이면서 guestId가 같으면 -->
				{#if $page.data.loginInfo?.role === 'ADMIN' || ($page.data.isLogin && $page.data.loginInfo?.name === comment.author?.name) || (!$page.data.isLogin && $page.data.guestId === comment.guest?.guestId)}
					<div>
						{#if $page.data.isLogin}
							<form
								method="POST"
								action="?/deleteCommentByUser"
								class="inline"
								use:enhance={deleteCommentByUser}
							>
								<input type="hidden" name="commentId" value={comment.id} />
								<button type="submit" class="text-sm text-red-500 hover:underline"> 삭제 </button>
							</form>
						{:else}
							<form
								method="POST"
								action="?/deleteCommentByGuest"
								class="inline"
								use:enhance={deleteCommentByGuest}
							>
								<input type="hidden" name="commentId" value={comment.id} />
								<button type="submit" class="text-sm text-red-500 hover:underline"> 삭제 </button>
							</form>
						{/if}
						<span> | </span>
						<button
							onclick={() => showForm(comment.id, 'update')}
							class="text-sm text-sky-500 hover:underline"
						>
							수정
						</button>
					</div>
				{/if}
			</div>
			<p class="mb-4 text-gray-700 dark:text-gray-300">{comment.content}</p>

			<!-- 댓글 수정 -->
			{#if formId === `${comment.id}:update`}
				<CommentForm commentId={comment.id} method="PATCH" content={comment.content} />
			{/if}

			<!-- 대댓글 목록 -->
			{#if comment.childComments && comment.childComments.length > 0}
				<div class="ml-4 mt-4 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
					{#each comment.childComments as reply (reply.id)}
						<div class="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
							<div class="flex justify-between">
								<p class="mb-1 text-sm text-gray-900 dark:text-gray-100">
									{reply.author?.name ? reply.author?.name : reply.guest?.nickName}
								</p>
								<!-- 관리자면 모두 || 유저이면서 작성자면 || 게스트이면서 guestId가 같으면 -->
								{#if $page.data.loginInfo?.role === 'ADMIN' || ($page.data.isLogin && $page.data.loginInfo?.name === comment.author?.name) || (!$page.data.isLogin && $page.data.guestId === comment.guest?.guestId)}
									<div>
										{#if $page.data.isLogin}
											<form
												method="POST"
												action="?/deleteCommentByUser"
												class="inline"
												use:enhance={deleteCommentByUser}
											>
												<input type="hidden" name="commentId" value={reply.id} />
												<button type="submit" class="text-sm text-red-500 hover:underline">
													삭제
												</button>
											</form>
										{:else}
											<form
												method="POST"
												action="?/deleteCommentByGuest"
												class="inline"
												use:enhance={deleteCommentByGuest}
											>
												<input type="hidden" name="commentId" value={reply.id} />
												<button type="submit" class="text-sm text-red-500 hover:underline">
													삭제
												</button>
											</form>
										{/if}
										<span> | </span>
										<button
											onclick={() => showForm(reply.id, 'update')}
											class="text-sm text-sky-500 hover:underline"
										>
											수정
										</button>
									</div>
								{/if}
							</div>
							<p class="text-gray-700 dark:text-gray-300">{reply.content}</p>

							<!-- 대댓글 수정 -->
							{#if formId === `${reply.id}:update`}
								<CommentForm commentId={reply.id} method="PATCH" content={reply.content} />
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- 대댓글 작성 -->
			<button
				onclick={() => showForm(comment.id, 'create')}
				class="text-primary-500 text-sm hover:underline">대댓글 달기</button
			>
			{#if formId === `${comment.id}:create`}
				<CommentForm parentCommentId={comment.id} method="POST" />
			{/if}
		</div>
	{/each}
</div>

<!-- 댓글 작성 -->
<CommentForm method="POST" />
