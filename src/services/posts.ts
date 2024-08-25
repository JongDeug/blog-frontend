import { getFetch } from '../utils/fetch';

const getPosts = async (params = {}) => {
	const queryString = new URLSearchParams(params).toString();
	return getFetch({ path: `/api/posts?${queryString}` });
};

const getPost = async (id: string) => {
	// query 가 더 있긴함
	return getFetch({ path: `/api/posts/${id}` });
};

export default {
	getPosts,
	getPost
};

