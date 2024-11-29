interface Comment {
	id: string;
	content: string;
	createdAt: string;
	parentCommentId: number;
	postId: number;
	authorId: number;
	guestId: number;
	author: { id: string; name: string; email: string } | null;
	guest: { id: string; nickName: string; email: string; guestId: string } | null;
	childComments: Comment[];
}
