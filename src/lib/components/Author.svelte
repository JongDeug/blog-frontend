<script>
	import SocialIcon from '$lib/components/SocialIcon.svelte';

	export let author = '김종환';
	export let avatar = '/tt.jpg';
	export let github = 'JongDeug';
</script>

{#if avatar}
	<img src={avatar} width="38px" height="38px" alt="avatar" class="h-10 w-10 rounded-lg" />
{/if}
<dl class="whitespace-nowrap text-sm font-medium leading-5">
	<dt class="sr-only">Author</dt>
	<dd class="text-base font-bold leading-6 text-gray-600 dark:text-gray-300">{author}</dd>
	{#if github}
		<dt class="sr-only">Github</dt>
		<dd>
			<SocialIcon icon="github" url='https://github.com/JongDeug' small>
				{github}
			</SocialIcon>
		</dd>
	{/if}
</dl>
