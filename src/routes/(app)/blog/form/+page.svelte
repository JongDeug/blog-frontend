<script>
	import { PostForm } from '$lib';

	const { data } = $props();
	const { initCategories } = data;
</script>

<PostForm title="게시글 작성" method="POST" {initCategories} />
