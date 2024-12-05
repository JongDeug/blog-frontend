<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib';

	let { initPosts = $bindable(), sortOption = $bindable(), isHome } = $props();
</script>

{#if initPosts.length === 0}
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
			<div class="flex items-center justify-between pt-3">
				<li class="block">
					<a
						href="/blog/form"
						class="mr-2 rounded-md border border-rose-500 p-1 text-sm font-medium text-rose-500 hover:font-extrabold"
						>게시글 작성</a
					>
				</li>
				<li>
					<select
						id="sort"
						name="sort"
						bind:value={sortOption}
						class="rounded-md border bg-gray-100 px-6 py-2 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
					>
						<option value="newest">최신순</option>
						<option value="oldest">오래된순</option>
						<option value="popular">인기순</option>
					</select>
				</li>
			</div>
		{:else}
			<div class="flex items-center justify-between pt-3">
				{#if !isHome}
					<li></li>
					<li>
						<select
							id="sort"
							name="sort"
							bind:value={sortOption}
							class="rounded-md border bg-gray-100 px-8 py-2 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
						>
							<option value="newest">최신순</option>
							<option value="oldest">오래된순</option>
							<option value="popular">인기순</option>
						</select>
					</li>
				{/if}
			</div>
		{/if}

		{#each initPosts as post}
			<li class="py-12">
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
												class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
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
