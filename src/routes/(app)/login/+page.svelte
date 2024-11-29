<script lang="ts">
	import { browser } from '$app/environment';

	const { form } = $props();

	if (browser) {
		if (form?.message) alert(`${form.message}`);
	}
</script>

<div class="flex items-center justify-center p-4">
	<div class="max-w-sm rounded-lg border-2 bg-white p-6 shadow-md dark:bg-gray-800">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">로그인</h2>

		<!-- 로그인 -->
		<form method="POST" action="?/login" class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>이메일</label
				>
				<input
					id="email"
					type="email"
					name="email"
					required
					placeholder="user@example.com"
					class="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				/>
			</div>

			<div>
				<label for="pwd" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>비밀번호</label
				>
				<input
					id="pwd"
					type="password"
					name="password"
					placeholder="******"
					class="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white shadow-sm transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					확인
				</button>
			</div>
		</form>
	</div>
</div>
