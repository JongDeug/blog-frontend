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
	],
	editor: {
		image: {
			use: 'figure',
			// use figure or img tag for images (figcaption will be used for caption of figure)
			// if you use figure, caption will be visible
			imgClass: 'img', // used class for img tags
			figureClass: 'fig-img', // used class for figure tags
			figCapClass: 'fig-cap', // used class for figcaption tags
			path: 'absolute'
			// if absolute is passed, the url property which is the absolute path to the image will be used
			// otherwise pass a relative path with the filename property in <> like so: '/img/<fileName>'
		},
		paragraph: {
			pClass: 'paragraph' // used class for paragraph tags
		},
		code: {
			codeBlockClass: 'code-block' // used class for code blocks
		},
		embed: {
			useProvidedLength: false
			// set to true if you want the returned width and height of editorjs to be applied
			// NOTE: sometimes source site overrides the lengths so it does not work 100%
		},
		quote: {
			applyAlignment: false
			// if set to true blockquote element will have text-align css property set
		}
	}
};

export const navLinks = [
	{ href: '/about', title: 'About' },
	{ href: '/projects', title: 'Projects' },
	{ href: '/blog', title: 'Blog' }
];
