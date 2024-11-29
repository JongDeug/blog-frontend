import { writable } from 'svelte/store';

export const replyFormVisible = writable('');
export const editFormVisible = writable('');

export const showReplyForm = (commentId: string) => {
	replyFormVisible.update((currentValue) => {
		return currentValue === commentId ? '' : commentId; // 버튼 클릭 시 comment.id 가 같으면 열림
	});
};

export const showEditForm = (commentId: string) => {
	editFormVisible.update((currentValue) => {
		return currentValue === commentId ? '' : commentId; // 버튼 클릭 시 comment.id 가 같으면 열림
	});
};
