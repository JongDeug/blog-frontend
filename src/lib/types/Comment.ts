interface CommentType {
	id: string;
	content: string;
	author: { id: string; name: string; } | null;
	guest: { id: string; nickName: string; email: string; } | null;
	childComments: CommentType[];
}

