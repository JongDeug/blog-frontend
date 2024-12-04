<script>
	import { browser } from '$app/environment';
	import { PostForm } from '$lib';

	const { data, form } = $props();
	const { initCategories } = data;

	if (browser) {
		if (form?.message) alert(`${form.message}`);
	}
</script>

<PostForm title="게시글 작성" method="POST" {initCategories} />
