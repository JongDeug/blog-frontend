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
	views: number;
	likes: number;
	categoryId: number;
	category: Category;
	isLiked: boolean;
	_count: { postLikes: number };
	tags: Tag[];
	images: { id: string; url: string }[];
	comments: Comment[];
}
