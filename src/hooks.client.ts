import type { HandleClientError } from '@sveltejs/kit';
import { error as throwError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, status }) => {
	console.error('[Hooks Client] : ', error);

	if (status === 404) {
		return throwError(status, '음');
	}

	return {
		message: 'Whoops!',
		status
	};
};
