<script>
	import { Head, Post } from '$lib';

	const { data } = $props();
	const { initPost } = data;
	const hi = '왜';
</script>

<Head title={initPost.title} />
<Post {initPost} />
