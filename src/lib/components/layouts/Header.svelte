<script>
	import { page } from '$app/stores';
	import { config, navLinks, ThemeSwitch, MobileMenu } from '$lib';
</script>

<header class="flex items-center justify-between py-10">
	<div>
		<a href="/" aria-label={config.headerTitle}>
			<div class="flex items-center justify-between">
				<div class="mr-3">
					<img src="/logo.svg" alt="Logo" class="h-10 w-auto rounded" />
				</div>
				<div class="font-body hidden text-4xl font-extrabold sm:block">
					{config.headerTitle}
				</div>
			</div>
		</a>
	</div>
	<div class="flex items-center text-base leading-5">
		<div class="hidden sm:block">
			{#each navLinks as link}
				<a href={link.href} class="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
					>{link.title}</a
				>
			{/each}
			{#if $page.data.isLogin}
				<!-- 로그아웃 -->
				<form method="POST" action="/auth?/logout" class="inline">
					<button class="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100">Logout</button>
				</form>
			{:else}
				<!-- 로그인 -->
				<a
					href="/auth?redirectTo={$page.url.pathname}"
					class="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100">Login</a
				>
			{/if}
		</div>
		<ThemeSwitch />
		<MobileMenu />
	</div>
</header>
