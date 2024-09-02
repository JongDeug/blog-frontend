export function handleError({ error, status }) {
	// I. 에러 출력
	console.error('Error occurred:', error);

	// I. error.svelte 로 넘어감
	if (status === 404) return { status, message: 'Page Not Found' };
	return { status, message: (error as Error).message };
}
