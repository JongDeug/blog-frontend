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
	intro: `
		안녕하세요! ✋ 이곳은 제가 학습한 내용들을 정리하고, 공유하기 위해 만든 공간입니다.
		<br />
		도움이 될 수 있는 글을 작성하려고 늘 노력하고 있습니다. 부족해도 너그러이 봐주시면 정말 감사하겠습니다.
		<br /> 여러분의 소중한 피드백은 성장하는데 큰 도움이 됩니다.
	`,
	about: `
		안녕하세요! ✋ 블로그 운영자 <strong>김종환</strong>이라고 합니다. 저는 백엔드 개발자를
			희망하고 있는 학생입니다. 학부에서 여러 주제로 팀 프로젝트를 진행해봤지만 실질적으로 유지 보수
			및 운영하고있는 프로젝트가 없었습니다. 그동안 설계와 구현에만 집중하고 있었다는 것을 깨달았고,
			유저가 한 명이라도 괜찮으니 직접 서비스를 운영해보는 경험이 필요하다는 생각이 들었습니다. 이
			블로그는 제 서비스 운영 경험의 첫 걸음입니다.
			<br />
			<br />
			근성있고 책임감을 가진 개발자가 되는 것이 제 목표입니다. 남들보다 늦더라도 꾸준히 해낸다면 블로그
			로고처럼 상승하는 그래프를 그릴 수 있을거라 확신합니다. 말하는 대로, 믿는 대로 이루어집니다! 오늘도
			좋은 하루 보내시길 바랍니다 :)
	`,
	goals: [
		'1. 실제 서비스 운영에서 겪을 수 있는 다양한 문제들을 직접 경험하고 개선할 수 있도록 한다.',
		'2. 지속적으로 코드 품질을 개선한다.',
		'3. 위와 같은 활동들을 통해 자연스럽게 포트폴리오를 강화한다.',
		'4. 개인 브랜딩을 통해 가치를 높일 수 있도록 한다.'
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
