import { getFetch } from '../utils/fetch';

const getCategories = async () => {
	return getFetch({ path: `/api/categories` });
};

export default {
	getCategories
};

