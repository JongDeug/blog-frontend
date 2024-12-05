const extractImageFileName = (htmlContent: string) => {
	const parser = new DOMParser();
	const document = parser.parseFromString(htmlContent, 'text/html');

	// NodeList: document.querySelectorAll('img')
	const fileNames = Array.from(document.querySelectorAll('img')).map((img) => {
		const url = img.src;
		const fileName = url.split('/').pop(); // '/'로 나누고 마지막 부분(파일 이름)을 추출
		return fileName;
	});

	return fileNames;
};

export default extractImageFileName;
