export const alertError = (status: number, error: string) => {
	alert(`${status}: ${error}`);
	return null;
};
