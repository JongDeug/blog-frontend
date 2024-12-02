<script>
	import { Form } from '$lib';

	const { data, form } = $props();
	const { initCategories, initPost, postId } = data;
</script>

<Form title="게시글 수정" method="PATCH" {initCategories} {initPost} {form} {postId} />
