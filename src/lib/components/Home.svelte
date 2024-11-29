<script lang="ts">
	import { Title, formatDate } from '$lib';

	let {
		posts,
		isLogin,
		title,
		h2
	}: { posts: Post[]; isLogin: boolean; title: string; h2: boolean } = $props();
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<div class="grid gap-4 lg:grid-cols-2">
			<div>
				<Title {title} {h2} />
			</div>
		</div>
	</div>

	{#if !posts.length}
		<div class="py-6 pr-3">
			{#if isLogin}
				<p class="text-right">
					<a href="/blog/form" class="mr-2 font-semibold hover:font-extrabold">게시글 작성</a>
					<span>|</span>
				</p>
			{/if}
			<p>No post found.</p>
		</div>
	{:else}
		<ul>
			{#if isLogin}
				<li class="pr-3 pt-6 text-right">
					<a href="/blog/form" class="mr-2 font-semibold hover:font-extrabold">게시글 작성</a>
					<span>|</span>
				</li>
			{/if}
			{#each posts as post}
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
												<span
													class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
												>
													{tag.name}
												</span>
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
										Read more &rarr;
									</a>
								</div>
							</div>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	{/if}

	{#if isLogin}
		<ul>
			<li class="pr-3 pt-6 text-right">
				<a href="/blog/form" class="mr-2 font-semibold hover:font-extrabold">게시글 작성</a>
				<span>|</span>
			</li>
		</ul>
	{/if}
</div>
