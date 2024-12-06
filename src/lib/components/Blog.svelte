<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Title, SearchBox, CategoryModal, Posts, config } from '$lib';

	let {
		initPosts = [],
		initCategories = [],
		title,
		searchBox = false,
		isHome = false
	}: {
		initPosts: Post[];
		initCategories?: Category[];
		title?: string;
		searchBox?: boolean;
		isHome?: boolean;
	} = $props();

	let search = $state('');
	let sortOption = $state('newest');
	let posts = $state(initPosts);
	let isModalOpen = $state(false);

	const searchPosts = async () => {
		const queryString = new URLSearchParams({ search }).toString();
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		posts = getPosts.posts;
	};

	const sortPosts = async () => {
		let getPosts;
		if (sortOption === 'oldest') {
			const order = ['createdAt_asc'];
			const queryString = new URLSearchParams();
			order.map((x) => queryString.append('order[]', x));
			queryString.append('take', '50');

			getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		} else if (sortOption === 'newest') {
			const order = ['createdAt_desc'];
			const queryString = new URLSearchParams();
			order.map((x) => queryString.append('order[]', x));
			queryString.append('take', '50');

			getPosts = await fetch(`${PUBLIC_API_URL}/post`).then((res) => res.json());
		}

		posts = getPosts.posts;
	};

	const toggleModal = () => {
		isModalOpen = !isModalOpen;
	};

	$effect(() => {
		// '' 가 아닐 때
		// delay 적용 해야함
		searchPosts();
	});

	$effect(() => {
		sortPosts();
	});
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		{#if isHome}
			<Title title="꾸벅" />
			<p class="prose-xl text-xl text-gray-800 dark:text-gray-400">
				{@html config.intro}
			</p>
		{/if}
		<div class="grid gap-4 lg:grid-cols-2">
			{#if !isHome}
				<div>
					<Title {title} h2={false} />
				</div>
			{/if}
			<div class:border-l-2={searchBox} class="pl-4">
				{#if initCategories.length}
					<div class="flex flex-wrap">
						{#each $page.data.initCategories as category}
							<div class="mr-5">
								<a
									href={`/category/${category.id}`}
									class="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
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
					</div>
					{#if $page.data.isLogin}
						<div class="my-4">
							<button
								class="mr-3 inline-block rounded-md border border-rose-500 p-1 text-sm font-medium text-rose-500 hover:font-extrabold"
								onclick={() => toggleModal()}
								>카테고리 관리
							</button>
						</div>
					{/if}
				{/if}

				{#if searchBox}
					<SearchBox bind:value={search} />
				{/if}
			</div>
		</div>
	</div>

	<Posts bind:initPosts={posts} bind:sortOption {isHome} />
</div>

{#if isModalOpen}
	<CategoryModal {initCategories} {toggleModal} />
{/if}
