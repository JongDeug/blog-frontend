<script lang="ts">
	import { browser } from '$app/environment';

	export let form;

	if (browser) {
		if (form?.notRegistered) alert('가입되지 않은 이메일 입니다');
		if (form?.incorrect) alert('비밀번호를 잘못 입력하셨습니다');
	}
</script>
<div class="flex items-center justify-center">
	<div class="w-full max-w-sm p-8 border-2 rounded">
		<h2 class="text-2xl font-bold text-center mb-6">로그인</h2>

		<form method="POST" action="/login" class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium">이메일</label>
				<input
					id="email"
					type="email"
					name="email"
					required
					placeholder="user@example.com"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
				/>
			</div>

			<div>
				<label for="pwd" class="block text-sm font-medium">비밀번호</label>
				<input
					id="pwd"
					type="password"
					name="password"
					required
					placeholder="******"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					확인
				</button>
			</div>
		</form>
	</div>
</div>
