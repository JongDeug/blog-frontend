<script>
	import { Head, Post } from '$lib';

	const { data } = $props();
	const { initPost } = data;
</script>

<Head title={initPost.title} />
<Post {initPost} />
