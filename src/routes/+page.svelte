<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';

	export let data;
	const { isLogin, getPosts } = data;
	const posts = getPosts.posts;
</script>

<Head />

<div class="pt-12">
	<h1
		class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
	>
		Welcome to my blog!
	</h1>
	<p class="text-xl prose-xl text-gray-800 dark:text-gray-400">
		제 기술 블로그에 오신 것을 진심으로 환영합니다! ✋ 이곳은 학습한 내용들을 정리하고, 공유하기 위해 만든 공간입니다.
		<br>
		깊이 있고 도움이 되는 글을 작성하려고 늘 노력하고 있습니다. 글에 부족함이 많더라도 너그러이 봐주시면 정말 감사하겠습니다.
		여러분의 소중한 피드백은 제가 성장하는데 큰 도움이 됩니다.
	</p>
</div>

<Blogs title="Latest Posts" h2 {posts} search={false} {isLogin} />
