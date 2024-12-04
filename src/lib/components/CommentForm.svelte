<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	let {
		isLogin,
		commentId,
		parentCommentId,
		method,
		content
	}: {
		isLogin: boolean;
		commentId: string;
		parentCommentId?: number;
		method: 'POST' | 'PATCH';
		content?: string;
	} = $props();
</script>

{#if isLogin}
	<!-- 회원 댓글 생성, 수정 -->
	<form
		method="POST"
		action={method === 'POST' ? '?/createCommentByUser' : '?/updateCommentByUser'}
		class="mt-4"
	>
		<input type="hidden" name="parentCommentId" value={parentCommentId} />
		<input type="hidden" name="commentId" value={commentId} />

		<div class="mb-4">
			<textarea
				bind:value={content}
				name="content"
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				rows="3"
				placeholder="여기에 댓글을 작성하세요"
			></textarea>
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				class="rounded-lg border border-blue-600 px-4 py-1 text-blue-600 hover:font-extrabold"
			>
				확인
			</button>
		</div>
	</form>
{:else if method === 'POST'}
	<!-- 게스트 댓글 생성 -->
	<form method="POST" action="?/createCommentByGuest" class="mt-4">
		<input type="hidden" name="parentCommentId" value={parentCommentId} />

		<div class="mb-4">
			<textarea
				name="content"
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				rows="3"
				placeholder="여기에 댓글을 작성하세요"
			></textarea>
		</div>

		<div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
			<input
				name="nickName"
				type="text"
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				placeholder="닉네임"
			/>

			<input
				name="email"
				type="email"
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				placeholder="이메일(알림 용도)"
			/>
		</div>

		<div class="mb-4">
			<input
				name="password"
				type="password"
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				placeholder="비밀번호(수정 및 삭제)"
			/>
		</div>

		<div class="mt-4 flex justify-end">
			<button
				type="submit"
				class="rounded-lg border border-blue-600 px-4 py-1 text-blue-600 hover:font-extrabold focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				확인
			</button>
		</div>
	</form>
{:else}
	<!-- 게스트 댓글 수정 -->
	<form method="POST" action="?/updateCommentByGuest" class="my-4">
		<input type="hidden" name="commentId" value={commentId} />
		<div class="mb-4">
			<textarea
				bind:value={content}
				name="content"
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				rows="3"
			></textarea>
		</div>

		<div class="mb-4">
			<input
				name="password"
				type="password"
				required
				class="w-full rounded-lg border bg-gray-50 p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				placeholder="비밀번호(수정 및 삭제)"
			/>
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				class="rounded-lg border border-blue-600 px-4 py-1 text-blue-600 hover:font-extrabold focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				확인
			</button>
		</div>
	</form>
{/if}
