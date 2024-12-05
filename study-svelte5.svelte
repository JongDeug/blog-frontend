<script lang="ts">
	// +page.server.ts에서 load 함수의 cookies는 브라우저가 보낸 쿠키
	// +page.ts는 클라이언트 쪽이기 때문에 document.cookie를 활용해야함. 쓸 일은 없지만

	// [isLogin]: hooks.server.ts => layout.server.ts => layout.ts => layout.svelte => page.svelte
	// [posts]: page.ts => page.svelte
	// const { data }: { data: PageData } = $props();

	let count = $state(1);
	let hi = $derived(count * 10); // 얘는 call by reference 동작
	// let hi = count * 10; // 얘는 call by value 동작
	$effect(() => {
		// effect안에 들어왔을 때 반응형 변수가 들어왔을 때 동작
		// hi;
		// count;
		console.log('hi');
	});
</script>

{hi}
{count}

<button onclick={() => count++}> hi </button>

<!-- 아래는 applyAction 예제!!! -->

<!-- <script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';

	// $effect(() => {
	// 	if ($page.form?.message) alert(`${$page.form.message}`);
	// });

	const redirectTo = $page.url.searchParams.get('redirectTo');

	const login: SubmitFunction = ({ formData }) => {
		formData.append('redirectTo', redirectTo ?? '/');

		return async ({ result }) => {
			if (result.type === 'redirect') {
				goto(redirectTo ?? result.location);
			}
			// 콘솔만 쓸거면 이렇게 해도됨!, applyAction 안쓰고
			//	else if(result.type === 'failure') {
			// alert(`${result.data?.message}`)
			// }
			await applyAction(result);
		};
	};
</script> -->

<!-- {#if $page.form?.message}
	문제가 생겼다 이말이야
{/if} -->

<!-- <div class="flex items-center justify-center p-4">
	<div class="max-w-sm rounded-lg border-2 bg-white p-6 shadow-md dark:bg-gray-800">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">로그인</h2>

		<form method="POST" action="?/login" class="space-y-4" use:enhance={login}>
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
					required
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
</div>  -->
