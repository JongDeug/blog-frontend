<script>
	import { config, navLinks } from '$lib/config';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';

	export let isLogin;

</script>

<header class="flex items-center justify-between py-10">
	<div>
		<a href="/" aria-label={config.headerTitle}>
			<div class="flex items-center justify-between">
				<div class="mr-3">
					<img src="/logo.svg" alt="Logo" class="h-10 w-auto rounded" />
				</div>
				<div class="hidden text-4xl font-extrabold sm:block font-body">
					{config.headerTitle}
				</div>
			</div>
		</a>
	</div>
	<div class="flex items-center text-base leading-5">
		<div class="hidden sm:block">
			{#each navLinks as link}
				<a href={link.href} class="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
				>{link.title}</a
				>
			{/each}
			{#if isLogin}
				<form method="POST" action="/logout?/logout" class="inline">
					<button class="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">Logout</button>
				</form>
			{:else}
				<a href="/login" class="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
				>Login</a>
			{/if}
		</div>
		<ThemeSwitch />
		<MobileMenu {isLogin}/>
	</div>
</header>
