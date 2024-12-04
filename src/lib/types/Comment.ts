interface Comment {
	id: number;
	content: string;
	createdAt: string;
	parentCommentId: number;
	postId: number;
	authorId: number;
	guestId: number;
	author: { id: number; name: string; email: string } | null;
	guest: { id: number; nickName: string; email: string; guestId: string } | null;
	childComments: Comment[];
}
