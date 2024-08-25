import { getFetch, postFetch } from '../utils/fetch';

const login = async (data: {}) => {
	return postFetch({ path: '/api/auth/login', data });
};

const logout = async () => {
	return getFetch({ path: '/api/auth/logout' });
};

const refresh = async () => {
	return getFetch({ path: '/api/auth/refresh' });
};

export default {
	login,
	logout,
	refresh
};