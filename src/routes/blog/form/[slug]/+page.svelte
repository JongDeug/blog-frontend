<script>
	import PostForm from '$lib/components/posts/PostForm.svelte';

	export let data;

	const categories = data.getCategories.categories;
	const post = data.getPost.post;

</script>

<PostForm title="게시글 수정" method="PATCH" {categories} {post} />
