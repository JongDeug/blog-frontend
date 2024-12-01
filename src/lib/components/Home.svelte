<script lang="ts">
	import { Posts } from '$lib';

	let { initPosts, isLogin }: { initPosts: Post[]; isLogin: boolean } = $props();
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-2 md:space-y-5"></div>

	<Posts posts={initPosts} {isLogin} />
</div>
