interface PostType {
	id: string;
	title: string;
	content: string;
	summary: string;
	prev?: string;
	next?: string;
	draft: boolean;
	createdAt: string; // 날짜 형식에 맞춰 Date 객체로 변경할 수 있습니다.
	tags: string[];
	isLiked: boolean;
	postLikeCount: number;
	comments: CommentType[];
	images: { id: string; url: string }[];
	categoryName: string;
}
