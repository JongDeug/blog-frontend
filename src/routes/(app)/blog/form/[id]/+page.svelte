<script>
	import { PostForm } from '$lib';

	const { data } = $props();
	const { initCategories, initPost } = data;
</script>

<PostForm title="게시글 수정" method="PATCH" {initCategories} {initPost} />
