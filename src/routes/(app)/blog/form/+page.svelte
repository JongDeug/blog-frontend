<script>
	import { Form } from '$lib';

	const { data, form } = $props();
	const { initCategories } = data;
</script>

<Form title="게시글 작성" method="POST" {initCategories} {form} />
