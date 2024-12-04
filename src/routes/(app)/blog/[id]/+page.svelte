<script>
	import { browser } from '$app/environment';
	import { Head, Post } from '$lib';

	const { data, form } = $props();
	const { initPost, loginInfo, isLogin, guestId } = data;

	if (browser) {
		if (form?.message) alert(`${form.message}`);
	}
</script>

<Head title={initPost.title} />

<Post {initPost} {isLogin} {loginInfo} {guestId} />
