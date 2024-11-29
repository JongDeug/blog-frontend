interface Post {
	id: number;
	title: string;
	content: string;
	summary: string;
	prevId?: number;
	nextId?: number;
	draft: boolean;
	createdAt: string; // 날짜 형식에 맞춰 Date 객체로 변경할 수 있습니다.
	authorId: number;
	categoryId: number;
	isLiked: boolean;
	postLikeCount: number;
	tags: Tag[];
	images: { id: string; url: string }[];
	comments: Comment[];
}
