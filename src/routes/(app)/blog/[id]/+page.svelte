<script>
	import { Head, Post } from '$lib';

	const { data } = $props();
	const { initPost } = data;
	const hi = 'hi';
</script>

<Head title={initPost.title} />
<Post {initPost} />
