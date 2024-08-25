export function getCookie(rawCookie: string) {
	// 쿠키는 'name=value; Path=/; HttpOnly; Secure' 형식으로 들어오므로, ';'로 분리
	const parts = rawCookie.split(';');

	// 쿠키의 첫 번째 부분은 'name=value' 형식이므로 '='로 분리
	const [nameValue, ...optionsParts] = parts;
	const [name, value] = nameValue.split('=').map(part => part.trim());

	// 옵션들을 저장할 객체
	const options: any = {};

	// 나머지 옵션들을 처리
	optionsParts.forEach(option => {
		const [key, val] = option.split('=').map(part => part.trim());

		if (key.toLowerCase() === 'path') {
			options.path = val;
		} else if (key.toLowerCase() === 'max-age') {
			options.maxAge = parseInt(val);
		} else if (key.toLowerCase() === 'expires') {
			options.expires = new Date(val);
		} else if (key.toLowerCase() === 'httponly') {
			options.httpOnly = true;
		} else if (key.toLowerCase() === 'secure') {
			options.secure = true;
		} else if (key.toLowerCase() === 'samesite') {
			options.sameSite = val;
		}
	});

	return { name, value, options };
}
