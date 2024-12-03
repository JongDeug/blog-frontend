<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Title, SearchBox, CategoryModal, Posts } from '$lib';

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
	let isModalOpen = $state(false);

	const searchPosts = async () => {
		const queryString = new URLSearchParams({ search }).toString();
		const getPosts = await fetch(`${PUBLIC_API_URL}/post?${queryString}`).then((res) => res.json());
		posts = getPosts.posts;
	};

	const toggleModal = () => {
		isModalOpen = !isModalOpen;
	};

	$effect(() => {
		// '' 가 아닐 때
		if (search) {
			// delay 적용 해야함
			searchPosts();
		}
	});
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

{#if isModalOpen}
	<CategoryModal {initCategories} {toggleModal} />
{/if}
