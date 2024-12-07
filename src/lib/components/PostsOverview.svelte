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
