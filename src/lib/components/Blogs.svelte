<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import formatDate from '$lib/utils/formatDate';
	import Category from '$lib/components/Category.svelte';
	import CategoryModal from './CategoryModal.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { toggleModal } from '$lib/utils/stores/modal';

	export let posts: PostType[];
	export let categories: CategoryType[] = [];
	export let title = '';
	export let subtitle = '';
	export let more = true;
	export let search = true;
	export let h2 = false;
	export let isLogin = false;

	let searchQuery: string | null = null;
	let currentPosts = posts;
	let draft = false;

	function handleInput(event: CustomEvent<string>) {
		searchQuery = event.detail; // 자식 컴포넌트에서 전달된 값
	}

	const searchPosts = async (search: string) => {
		const queryString = new URLSearchParams({ search }).toString();
		const getPosts = await fetch(`${PUBLIC_API_URL}/posts?${queryString}`).then(res => res.json());
		if (search) currentPosts = getPosts.posts;
		else currentPosts = posts;
	};

	const draftPosts = async (value: boolean) => {
		const queryString = new URLSearchParams({ draft: value.toString() }).toString();
		const getPosts = await fetch(`${PUBLIC_API_URL}/posts?${queryString}`).then(res => res.json());
		currentPosts = getPosts.posts;
	};

	$: searchQuery !== null ? searchPosts(searchQuery) : '';
	$: draft ? draftPosts(draft) : currentPosts = posts;
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pt-6 pb-8 md:space-y-5">
		<div class="grid lg:grid-cols-2 gap-4">
			<div>
				<Title {title} {subtitle} {h2} />
			</div>

			<div class="pl-4" class:border-l-2={search}>
				{#if search}
					<SearchBox on:input={handleInput} />
				{/if}

				{#if categories?.length}
					<div class="flex flex-wrap">
						{#each categories as category}
							<div class="mr-5">
								<Category text={category.name} size="text-xs" />
								<a
									href={`/categories/${category.name}`}
									class="-ml-2 text-xs font-semibold uppercase tex	t-gray-600 dark:text-gray-300"
								>
									{`(${category.count})`}
								</a>
							</div>
						{/each}
						{#if isLogin}
							<div class="mr-5">
								<button
									class="mr-3 inline-block font-medium uppercase text-xs" on:click={() => toggleModal()}
								>카테고리 관리
								</button>
							</div>
						{/if}
					</div>
				{:else}
					{#if isLogin && search}
						<div class="mr-5">
							<button
								class="mr-3 inline-block font-medium uppercase text-xs" on:click={() => toggleModal()}
							>카테고리 관리
							</button>
						</div>
					{/if}
				{/if}

			</div>
		</div>
	</div>

	{#if !currentPosts.length}
		<div class="py-6">
			{#if isLogin}
				<p class="text-right">
					<a href="/blog/form" class="font-semibold hover:font-extrabold mr-2">게시글 작성</a>
					<span>|</span>
					<input
						type="checkbox"
						id="draft"
						bind:checked={draft}
						class="ml-2 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out bg-gray-200 dark:bg-gray-700"
					/>
					<label for="draft" class="font-medium">Draft</label>
				</p>
			{/if}
			<p>No post found.</p>
		</div>
	{:else}
		<ul>
			{#if isLogin}
				<li class="text-right pt-6 pr-3">
					<a href="/blog/form" class="font-semibold hover:font-extrabold mr-2">게시글 작성</a>
					<span>|</span>
					<input
						type="checkbox"
						id="draft"
						bind:checked={draft}
						class="ml-2 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out bg-gray-200 dark:bg-gray-700"
					/>
					<label for="draft" class="font-medium">Draft</label>
				</li>
			{/if}
			{#each currentPosts as post}
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
													class="mr-3 font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
													{tag}
												</span>
											{/each}
										</div>
									</div>
									<div class="prose max-w-none text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis max-h-20">
										{post.summary}
									</div>
								</div>
								{#if more}
									<div class="text-base font-medium leading-6">
										<a
											href={`/blog/${post.id}`}
											class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
											aria-label={`Read "${post.title}"`}
										>
											Read more &rarr;
										</a>
									</div>
								{/if}
							</div>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<CategoryModal categories={categories} />
