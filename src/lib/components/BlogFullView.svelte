<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Title, SearchBox, CategoryModal, PostsFullView } from '$lib';
	import { onMount } from 'svelte';

	let {
		initCategories = [],
		title
	}: {
		initCategories?: Category[];
		title?: string;
	} = $props();

	let posts = $state([] as Post[]);
	let cursor = $state('');
	let search = $state(undefined);
	let draft = $state('false');
	let order = $state([] as string[]);
	let queryString = $state(new URLSearchParams());
	let sortOption = $state('newest');

	let scrollY = $state(0);
	let innerHeight = $state(0);

	let isModalOpen = $state(false);

	$effect(() => {
		const scrollPosition = scrollY + innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		// 스크롤이 바닥을 찍었을 때 실행
		if (Math.ceil(scrollPosition) >= documentHeight) {
			applyCursorPagination();
		}
	});

	const applyCursorPagination = async () => {
		if (cursor) {
			queryString.set('cursor', cursor);
			queryString.set('take', '2');
			queryString.set('search', search ?? '');
			queryString.set('draft', draft);
			order.forEach((value, index) => {
				queryString.set(`order[${index}]`, value);
			});
			const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) =>
				res.json()
			);
			await new Promise((resolve) => setTimeout(resolve, 500));
			posts = [...posts, ...getPosts.posts];
			cursor = getPosts.cursor;
		}
	};

	$effect(() => {
		if (search !== undefined) {
			searchPosts();
		}
	});

	const searchPosts = async () => {
		console.log('search');
		const queryString = new URLSearchParams({ search: search ?? '' }).toString();
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		posts = getPosts.posts;
		cursor = getPosts.cursor;
	};

	$effect(() => {
		if (sortOption === 'newest') getNewest();
		else if (sortOption === 'oldest') getOldest();
		else if (sortOption === 'draft') getDraft();
	});

	const getNewest = async () => {
		console.log('newest');
		const queryString = new URLSearchParams({});
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		posts = getPosts.posts;
		cursor = getPosts.cursor;
		search = undefined;
		draft = 'false';
		order = [];
	};

	const getOldest = async () => {
		const newOrder = ['id_asc'];
		const queryString = new URLSearchParams();
		newOrder.map((x) => queryString.append('order[]', x));
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());

		posts = getPosts.posts;
		cursor = getPosts.cursor;
		search = undefined;
		draft = 'false';
		order = newOrder;
	};

	const getDraft = async () => {
		const queryString = new URLSearchParams({ draft: 'true' });
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());

		posts = getPosts.posts;
		cursor = getPosts.cursor;
		draft = 'true';
		search = undefined;
		order = [];
	};

	const toggleModal = () => {
		isModalOpen = !isModalOpen;
	};
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<div class="grid gap-4 lg:grid-cols-2">
			<div>
				<Title {title} h2={false} />
			</div>
			<div class="border-l-2 pl-4">
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

							<p class="inline-block">
								<a
									href="/blog/form"
									class="mr-2 rounded-md border border-rose-500 p-1 text-sm font-medium text-rose-500 hover:font-extrabold"
									>게시글 작성</a
								>
							</p>
						</div>
					{/if}
				{/if}

				<SearchBox bind:value={search} />
			</div>
		</div>
	</div>

	<PostsFullView bind:posts bind:sortOption />
</div>

{#if isModalOpen}
	<CategoryModal {initCategories} {toggleModal} />
{/if}
