interface GetPostsQuery {
	search?: string;
	take?: number;
	draft?: string;
	cursor?: string;
	order?: string[];
}
