<script>
	import PostForm from '$lib/components/posts/PostForm.svelte';

	export let data;
	const categories = data.getCategories.categories;

</script>

<PostForm title="게시글 작성" method="POST" {categories} post={null} />

