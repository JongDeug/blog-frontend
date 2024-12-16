<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib';

	const { initPosts } = $props();
</script>

{#if !initPosts}
	<div class="py-6 pr-3">
		{#if $page.data.isLogin}
			<p class="text-right">
				<a
					href="/blog/form"
					class="mr-2 rounded-md border border-rose-500 p-1 text-sm font-medium text-rose-500 hover:font-extrabold"
					>게시글 작성</a
				>
			</p>
		{/if}
		<p>No post found.</p>
	</div>
{:else}
	<ul>
		{#if $page.data.isLogin}
			<div class="flex items-center justify-end pt-3">
				<li class="block">
					<a
						href="/blog/form"
						class="mr-2 rounded-md border border-rose-500 p-1 text-sm font-medium text-rose-500 hover:font-extrabold"
						>게시글 작성</a
					>
				</li>
			</div>
		{/if}

		{#each initPosts as post}
			<li class="py-8">
				<article>
					<div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
						<dl class="whitespace-nowrap text-sm font-medium leading-5">
							<dt class="sr-only">Published on</dt>
							<dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
								<time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
								<div class="mt-3 flex gap-2">
									<div class="flex gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.6 1.87-1.992 3.828-3.749 5.087C16.462 18.67 14.322 19 12 19c-2.322 0-4.462-.33-6.793-1.013C4.45 15.828 3.058 13.87 2.458 12z"
											/>
										</svg>
										<span>{post.views}</span>
									</div>

									<div class="flex gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
										<span>{post.likes}</span>
									</div>
								</div>
							</dd>
						</dl>
						<div class="space-y-5 xl:col-span-3">
							<div class="space-y-6">
								<div>
									<h2 class="text-2xl font-bold leading-8 tracking-tight">
										<a href={`/blog/${post.id}`} class="text-gray-900 dark:text-gray-100">
											{post.title}
										</a>
									</h2>
									<div class="flex flex-wrap">
										{#each post.tags as tag}
											<a
												href={`/tag/${tag.id}`}
												class="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
											>
												{tag.name}
											</a>
										{/each}
									</div>
								</div>
								<div
									class="prose max-h-20 max-w-none overflow-hidden text-ellipsis text-gray-500 dark:text-gray-400"
								>
									{post.summary}
								</div>
							</div>
							<div class="text-base font-medium leading-6">
								<a
									href={`/blog/${post.id}`}
									class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
									aria-label={`Read "${post.title}"`}
								>
									더보기 &rarr;
								</a>
							</div>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
{/if}
