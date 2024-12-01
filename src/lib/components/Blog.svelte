<script lang="ts">
	import { Title, SearchBox, CategoryModal, PostFetch } from '$lib';
	import { toggleModal } from '$lib/utils/stores/modal';
	import Posts from './Posts.svelte';

	let {
		initPosts = [],
		initCategories = [],
		isLogin,
		title,
		searchBox = false
	}: {
		initPosts: Post[];
		initCategories?: Category[];
		isLogin: boolean;
		title: string;
		searchBox?: boolean;
	} = $props();

	let search = $state('');
	let posts = $state(initPosts);

	// delay 안되네, debounce 나중에 찾아보기
	// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	async function searchPosts() {
		const getPosts = await PostFetch.getPosts({ search });
		posts = getPosts.posts;
	}

	$effect(() => {
		// '' 가 아닐 때
		if (search) searchPosts();
	});

	// let draft = false;

	// const draftPosts = async (value: boolean) => {
	// 	const queryString = new URLSearchParams({ draft: value.toString() }).toString();
	// 	const getPosts = await fetch(`${PUBLIC_API_URL}/posts?${queryString}`).then((res) =>
	// 		res.json()
	// 	);
	// 	currentPosts = getPosts.posts;
	// };

	// $: draft ? draftPosts(draft) : (currentPosts = posts);
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<div class="grid gap-4 lg:grid-cols-2">
			<div>
				<Title {title} h2={false} />
			</div>
			<div class:border-l-2={searchBox} class="pl-4">
				{#if searchBox}
					<SearchBox bind:value={search} />
				{/if}

				{#if initCategories.length}
					<div class="flex flex-wrap">
						{#each initCategories as category}
							<div class="mr-5">
								<a
									href={`/category/${category.id}`}
									class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
								>
									{category.name}
								</a>
								<a
									href={`/category/${category.id}`}
									class="tex t-gray-600 -ml-2 text-xs font-semibold uppercase dark:text-gray-300"
								>
									{`(${category._count.posts})`}
								</a>
							</div>
						{/each}
						{#if isLogin}
							<div class="mr-5 mt-3">
								<button
									class="mr-3 inline-block rounded-md border border-rose-500 p-1 text-sm font-medium text-rose-500 hover:font-extrabold"
									onclick={() => toggleModal()}
									>카테고리 관리
								</button>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<Posts {posts} {isLogin} />
</div>

<!-- <CategoryModal {categories} /> -->
