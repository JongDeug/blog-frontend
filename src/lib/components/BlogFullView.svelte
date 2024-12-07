<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Title, SearchBox, CategoryModal, PostsFullView } from '$lib';

	let {
		initCategories = [],
		title
	}: {
		initCategories?: Category[];
		title?: string;
	} = $props();

	let search = $state(); // 1빠따
	let sortOption = $state('newest'); // 2빠따
	let posts = $state([]);
	let isModalOpen = $state(false);

	const searchPosts = async () => {
		// console.log('search');
		const queryString = new URLSearchParams({ search: search as string }).toString();
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		posts = getPosts.posts;
	};

	const sortPosts = async () => {
		let getPosts;
		if (sortOption === 'newest') {
			// console.log('sort newest');
			const queryString = new URLSearchParams({ take: '50' });
			getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		} else if (sortOption === 'oldest') {
			// console.log('sort oldest');
			const order = ['createdAt_asc'];
			const queryString = new URLSearchParams();
			order.map((x) => queryString.append('order[]', x));
			queryString.append('take', '50');
			getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		} else if (sortOption === 'draft') {
			const queryString = new URLSearchParams({ draft: 'true', take: '50' });
			getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		}
		posts = getPosts.posts;
	};

	const toggleModal = () => {
		isModalOpen = !isModalOpen;
	};

	// 처음은 최신순으로 GET
	$effect(() => {
		if (search) {
			searchPosts();
		} else {
			sortPosts();
		}
	});
</script>

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
