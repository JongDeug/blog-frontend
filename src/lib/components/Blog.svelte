<script lang="ts">
	import { config } from '$lib/config';
	import Author from '$lib/components/Author.svelte';
	import Comments from '$lib/components/comments/Comments.svelte';
	import { deletePost, postLike } from '$lib/utils/api/request/post';

	export let post: PostType;
	export let isLogin;

	const handleLike = async (postId: string, tryToLike: boolean) => {
		try {
			const guestLikeId = localStorage.getItem('guestLikeId');
			await postLike({ postId, tryToLike, guestLikeId });
		} catch (err) {
			alert(`${err}`);
		}
	};


	const handleDelete = async (id: string) => {
		try {
			const userConfirm = confirm('게시글을 정말 삭제하시겠습니까?');

			if (userConfirm) await deletePost(id);
		} catch (err) {
			alert(`${err}`);
		}
	};

</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
	<article>
		<div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
			<header class="pt-6 xl:pb-6">
				{#if post?.images.length}
					<div class=" w-full pb-6">
						<img
							alt={post.title}
							src={post.images[0].url}
							class="object-cover object-center w-full h-auto"
						/>
					</div>
				{/if}
				<div class="space-y-1 text-center">
					<div>
						<h1
							class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
						>
							{post.title}
						</h1>
					</div>
					<dl class="space-y-10">
						<div>
							<dt class="sr-only">Published on</dt>
							<dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
								<time dateTime={post.createdAt}>
									{new Date(post.createdAt).toLocaleDateString(config.locale, {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							</dd>
						</div>
					</dl>
				</div>
			</header>
			<div
				class="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
				style="grid-template-rows: auto 1fr;"
			>
				<dl class="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
					<dt class="sr-only">Authors</dt>
					<dd>
						<ul
							class="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8"
						>
							<li class="flex items-center space-x-2">
								<Author />
							</li>
						</ul>
					</dd>
				</dl>
				<div
					class="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0"
				>
					<div class="prose max-w-none pt-10 pb-8 dark:prose-dark">
						{@html post.content}
					</div>
				</div>
				<footer class="">
					<div
						class="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y"
					>
						{#if isLogin}
							<div class="py-4 flex justify-around">
								<button on:click={() => handleDelete(post.id)} class="font-semibold hover:font-extrabold text-red-600">
									게시글 삭제
								</button>
								<a href="/blog/form/{post.id}" class="font-semibold hover:font-extrabold ">게시글 수정</a>
							</div>
							<!--							<p class="py-4">></p>-->
							<!--							<p class="py-4"></p>-->

						{/if}
						{#if post.tags.length}
							<div class="py-4 xl:py-8">
								<h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
									Tags
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
						{/if}
						{#if post.next || post.prev}
							<div class="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
								{#if post.prev}
									<div>
										<h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
											Previous Article
										</h2>
										<div
											class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
										>
											<a href={`/blog/${post.prev}`}>이전 게시글 이동</a>
										</div>
									</div>
								{/if}
								{#if post.next}
									<div>
										<h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
											Next Article
										</h2>
										<div
											class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
										>
											<a href={`/blog/${post.next}`}>다음 게시글 이동</a>
										</div>
									</div>
								{/if}
							</div>
						{/if}
					</div>
					<div class="pt-4 xl:pt-8">
						<a
							href="/blog"
							class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
						>
							&larr; 블로그로 돌아가기
						</a>
					</div>
					<div class="py-4 xl:py-8 sticky top-0">
						<button on:click={() => handleLike(post.id, !post.isLiked)} class="border shadow-md px-4 py-2 rounded-3xl">
							{#if post.isLiked}
								<span>&#x2764; 좋아요 {post.postLikeCount}</span>
							{:else}
								<span>&#x2661; 좋아요 {post.postLikeCount}</span>
							{/if}
						</button>
					</div>
				</footer>
			</div>
		</div>
	</article>

	<Comments comments={post.comments} />
</div>

