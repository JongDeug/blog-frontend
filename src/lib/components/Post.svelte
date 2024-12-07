<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Author, config, formatDate, Comments } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';

	const {
		initPost
	}: {
		initPost: Post;
	} = $props();

	const deletePost: SubmitFunction = async ({ cancel }) => {
		if (confirm('정말로 삭제하시겠습니까?')) {
			return ({ result }) => {
				if (result.type === 'success') {
					goto('/blog');
				} else if (result.type === 'failure') {
					alert(`${result.data?.message}`);
				}
			};
		}
		cancel();
	};

	const postLike: SubmitFunction = () => {
		return ({ result, update }) => {
			if (result.type === 'success') {
				update();
			} else if (result.type === 'failure') {
				alert(`${result.data?.message}`);
			}
		};
	};
</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
	<article>
		<div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
			<header class="pt-6 xl:pb-6">
				{#if initPost?.images.length}
					<div class="w-full pb-6">
						<img
							alt={initPost.title}
							src={initPost.images[0].url}
							class="h-96 w-full object-contain"
						/>
					</div>
				{/if}
				<div class="space-y-1 text-center">
					<div>
						<h1
							class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14"
						>
							{initPost.title}
						</h1>
					</div>
					<dl class="space-y-10">
						<div>
							<dt class="sr-only">Published on</dt>
							<dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
								{formatDate(initPost.createdAt)}
							</dd>
						</div>
					</dl>
				</div>
			</header>
			<div
				class="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
				style="grid-template-rows: auto 1fr;"
			>
				<dl class="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
					<dt class="sr-only">Authors</dt>
					<dd>
						<ul
							class="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8"
						>
							<li class="flex items-center space-x-2">
								<Author
									author={config.author}
									avatar={config.github.avatar}
									github={config.github.url}
									githubName={config.github.name}
								/>
							</li>
						</ul>
					</dd>
				</dl>
				<div class="prose p-10 lg:prose-xl xl:col-span-3 xl:row-span-2 xl:pb-0">
					<!-- <Viewer content={initPost.content} /> -->
					{@html initPost.content}
				</div>
				<div
					class="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y"
				>
					{#if $page.data.isLogin}
						<div class="flex justify-around py-4">
							<form method="POST" action="?/deletePost" use:enhance={deletePost}>
								<button type="submit" class="font-semibold text-red-600 hover:font-extrabold">
									게시글 삭제
								</button>
							</form>
							<a
								href="/blog/form/{initPost.id}"
								class="font-semibold text-sky-600 hover:font-extrabold">게시글 수정</a
							>
						</div>
					{/if}
					{#if initPost.tags.length}
						<div class="py-4 xl:py-8">
							<h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Tags</h2>
							<div class="flex flex-wrap">
								{#each initPost.tags as tag}
									<a
										href="/tag/{tag.id}"
										class="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
									>
										{tag.name}
									</a>
								{/each}
							</div>
						</div>
					{/if}
					{#if initPost.nextId || initPost.prevId}
						<div class="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
							{#if initPost.prevId}
								<div>
									<h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Previous Article
									</h2>
									<div class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
										<a href={`/blog/${initPost.prevId}`}>이전 게시글 이동</a>
									</div>
								</div>
							{/if}
							{#if initPost.nextId}
								<div>
									<h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Next Article
									</h2>
									<div class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
										<a href={`/blog/${initPost.nextId}`}>다음 게시글 이동</a>
									</div>
								</div>
							{/if}
						</div>
					{/if}
					<form
						method="POST"
						action="?/postLike"
						class="sticky top-0 py-4 xl:py-8"
						use:enhance={postLike}
					>
						<button
							class="flex transform items-center space-x-5 rounded-full border border-gray-300 px-5 py-3 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
							type="submit"
						>
							{#if $page.data.initPost.isLiked}
								<span>&#x1F49C; 좋아요 {$page.data.initPost._count.postLikes}</span>
							{:else}
								<span>&#x1F90D; 좋아요 {$page.data.initPost._count.postLikes}</span>
							{/if}
						</button>
					</form>
				</div>
			</div>
		</div>
	</article>

	<Comments />
</div>
