export const config = {
	title: 'Jongdeug (un)official blog',
	author: 'Kim Jong Hwan',
	headerTitle: 'Jongdeug',
	description: 'Jongdeug (un)official blog, created with Sveltekit',
	language: 'ko-KR',
	theme: 'light', // system, dark or light
	siteUrl: 'https://pied-piper-blog.netlify.app',
	siteRepo: 'https://github.com/akiarostami/sveltekit-tailwind-blog-starter',
	siteLogo: '/icon.png',
	image: '/img/avatar.png',
	email: 'jongdeug2021@gmail.com',
	github: 'https://github.com/JongDeug',
	linkedin: 'https://www.linkedin.com/company/pied-piper-plc/',
	locale: 'ko-KR',
	primaryColor: '#06a261',
	projects: [
		{
			title: 'Jongdeug Blog',
			date: '2024-08-24',
			draft: false,
			description: '블로그 프로젝트',
			href: 'https://github.com/JongDeug/blog-backend',
			image: 'icon.png'
		}
	]
};

export const navLinks = [
	{ href: '/about', title: 'About' },
	{ href: '/projects', title: 'Projects' },
	{ href: '/blog', title: 'Blog' }
];
