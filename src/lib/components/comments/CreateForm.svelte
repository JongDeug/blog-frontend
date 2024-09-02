<script>
	let nickName = '';
	let email = '';
	let password = '';
	export let parentId = '';

</script>

<div class="mt-4">
	<div class="mb-4">
	    			<textarea
							class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
							rows="4"
							placeholder="여기에 댓글을 작성하세요"></textarea>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
		<input
			bind:value={nickName}
			type="text"
			class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
			placeholder="닉네임" />

		<input
			bind:value={email}
			type="email"
			class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
			placeholder="이메일(댓글 알림)" />
	</div>

	<div class="mb-4">
		<input
			bind:value={password}
			type="password"
			class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
			placeholder="비밀번호(수정 및 삭제 시 사용)" />
	</div>

	<button
		class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
		완료
	</button>
</div>