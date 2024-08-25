export const config = {
	title: 'Jongdeug (un)official blog',
	author: 'Kim Jong Hwan',
	headerTitle: 'Jongdeug',
	description: 'Jongdeug (un)official blog, created with Sveltekit and Tailwind.css',
	language: 'ko-KR',
	theme: 'dark', // system, dark or light
	siteUrl: 'https://pied-piper-blog.netlify.app',
	siteRepo: 'https://github.com/akiarostami/sveltekit-tailwind-blog-starter',
	siteLogo: '/icon.png',
	// image: '/img/avatar.png',
	email: 'jongdeug2021@gmail.com',
	github: 'https://github.com/JongDeug',
	linkedin: 'https://www.linkedin.com/company/pied-piper-plc/',
	locale: 'ko-KR',
	primaryColor: '#06a261',

	// supports buttondown, convertkit, emailoctopus, klaviyo, mailchimp, revue
	// use false or null to disable newsletter
	// check .env.example for settings needed values for each service
	newsletter: 'mailchimp',

	multiuser: true,

	projects: [
		{
			title: 'Jongdeug Blog',
			date: '2024-08-24',
			draft: false,
			description: '블로그 프로젝트',
			href: 'https://www.bustle.com/p/piperchat-from-silicon-valley-has-real-inspirations-that-you-can-use-today-52313',
			image: 'icon.png'
		}
	]
};

export const user = {
	name: 'admin',
	// avatar value can be removed for image
	avatar: '/logo.png',
	// twitter value can be removed for no link to twitter
	twitter: 'https://twitter.com/piedpiperplc'
};

export const navLinks = [
	{ href: '/about', title: 'About' },
	{ href: '/projects', title: 'Projects' },
	{ href: '/blog', title: 'Blog' },
];

export const openGraph = {
	enabled: true,
	width: 1200,
	height: 630
};
