<script>
	import { browser } from '$app/environment';
	import { PostForm } from '$lib';

	const { data, form } = $props();
	const { initCategories, initPost } = data;

	if (browser) {
		if (form?.message) alert(`${form.message}`);
	}
</script>

<PostForm title="게시글 수정" method="PATCH" {initCategories} {initPost} />
