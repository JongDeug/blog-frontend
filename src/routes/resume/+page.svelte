<script>
	let name = '김종환';
	let profession = 'Back-End Developer';
	let links = [
		{ name: 'Birth', content: '2024/11/11', isLink: false },
		{ name: 'Address', content: '경상북도', isLink: false },
		{ name: 'GitHub', url: 'https://github.com/JongDeug', isLink: true },
		{ name: 'Blog', url: 'https://jongdeug.port0.org', isLink: true },
		{ name: 'Email', url: 'jongdeug2021@gmail.com', isLink: true, isEmail: true }
	];
	let skills = {
		backend: ['Express.js', 'Nest.js', 'Node.js', 'Javascript', 'Typescript'],
		devops: ['MySQL', 'Nginx', 'Ubuntu', 'Docker'],
		frontend: ['Svelte', 'HTML', 'CSS']
	};
	let educations = [
		{
			colleague: '국립금오공과대학교',
			major: '컴퓨터소프트웨어공학과',
			duration: '2021 ~ 2024',
			gpa: '3.63/4.5'
		},
		{
			colleague: '경운대학교',
			major: '항공소프트웨어공학과',
			duration: '2017 ~ 2020',
			gpa: '4.2/4.5'
		}
	];
	let certificates = [
		{ name: 'TOEIC Speaking [140/IH]', authority: '한국TOEIC위원회', date: '2024.07.14' },
		{ name: '정보처리기사', authority: '한국산업인력공단', date: '2023.09.01' },
		{ name: 'SQLD', authority: '한국데이터산업진흥원', date: '2023.10.06' },
		{ name: '리눅스마스터2급', authority: '한국정보통신진흥협회', date: '2023.12.20' }
	];
	let projects = [
		{
			name: '블로그 프로젝트',
			member: '개인',
			duration: '2024/06 ~ 현재',
			content:
				'블로그를 직접 개발했습니다. 지속적으로 운영 및 유지 보수할 수 있는 프로젝트의 필요성을 느꼈기 때문입니다. 라즈베리파이를 활용해 실제로 운영 중이며 꾸준히 개선해나가고 있는 프로젝트입니다.'
		}
	];
</script>

<div class="max-w-4xl mx-auto p-6 font-sans">
	<header class="mb-10">
		<div>
			<h1 class="text-4xl font-bold text-gray-800 mb-2 highlight">{name}</h1>
			<p class="text-xl font-bold text-gray-600 mb-2">{profession}</p>
		</div>
		<div class="flex justify-between items-center gap-10">
			<div>
				<img src="/icon.png" alt="" class="rounded-3xl" width="300" height="300" />
			</div>
			<table class="w-full max-w-4xl mx-auto">
				<tbody>
					{#each links as link}
						<tr class="border-b-2 border-gray-200">
							<td class="p-2 text-lg font-semibold">{link.name}</td>
							{#if link.isLink && link.isEmail}
								<td align="center">
									<a class="text-blue-600 hover:underline" href="mailto:{link.url}">{link.url}</a>
								</td>
							{:else if link.isLink}
								<td align="center">
									<a class="text-blue-600 hover:underline" href={link.url}>{link.url}</a>
								</td>
							{:else}
								<td align="center">
									{link.content}
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</header>

	<section class="mb-10">
		<h2 class=" text-2xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
			<span class="highlight">소개</span>
		</h2>
		<p class="mt-4">
			안녕하세요! (회사의 인재상) 인 사람입니다 ~ 책임감있고 끈기있는 프로그래밍으로 현실에 있는
			문제를 잘 해결할 수 있는 개발자가 되는 것이 목표인 김종환이라고 합니다.3 증명하기 위해 뭐
			사진을 올리거나 하면 좋다. 헬스 기록 같은거 (증명해라) 헬스 기록을 하면서 어떤 식으로 개선하고
			해결하는지
		</p>
	</section>

	<section class="mb-10">
		<h2 class="text-2xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
			<span class="highlight">스킬</span>
		</h2>
		<p class="mb-3">프로젝트에 적용해보았던 기술들입니다</p>
		<p class="font-bold">Back-End</p>
		<ul class="flex flex-wrap gap-2">
			{#each skills.backend as tech}
				<li class="bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm">{tech}</li>
			{/each}
		</ul>
		<p class="font-bold mt-4">DevOps</p>
		<ul class="flex flex-wrap gap-2">
			{#each skills.devops as tech}
				<li class="bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm">{tech}</li>
			{/each}
		</ul>
		<p class="font-bold mt-4">Front-End</p>
		<ul class="flex flex-wrap gap-2">
			{#each skills.frontend as tech}
				<li class="bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm">{tech}</li>
			{/each}
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="text-2xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
			<span class="highlight">학력</span>
		</h2>
		<ul>
			{#each educations as education}
				<li class="mb-6">
					<h3 class="text-xl font-semibold text-gray-800">
						{education.colleague} - <span class="text-sm">{education.major}</span>
					</h3>
					<span class="text-gray-500">{education.duration}</span>
					<p class="text-gray-500">학점: {education.gpa}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- 자격증 및 어학 -->
	<section class="mb-10">
		<h2 class="text-2xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
			<span class="highlight">자격증 및 어학</span>
		</h2>
		<ul>
			{#each certificates as certificate}
				<li class="mb-6">
					<h3 class="text-xl font-semibold text-gray-800">
						{certificate.name} - <span class="text-sm">{certificate.authority}</span>
					</h3>
					<span class="text-gray-500">{certificate.date}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="text-2xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
			<span class="highlight">프로젝트</span>
		</h2>
		<ul>
			{#each projects as project}
				<li class="mb-6">
					<h3 class="text-xl font-semibold text-gray-800">
						{project.name} / {project.member} /
						<a href="hi" class="hover:underline text-blue-600">포트폴리오 링크</a>
					</h3>
					<span class="text-gray-500">{project.duration}</span>
					<p class="my-3">{project.content}</p>
					<span class="font-bold">[주요 기능]</span>
					<ul>
						<li>- 게시판 CRUD</li>
						<li>- 비회원 댓글</li>
						<li>- 비회원 좋아요</li>
					</ul>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.highlight {
		position: relative;
		display: inline-block;
	}

	.highlight::before {
		content: '';
		position: absolute;
		bottom: 50%; /* 높이의 절반까지만 */
		left: 0;
		right: 0;
		top: 30%;
		height: 50%;
		background-color: yellow; /* 형광펜 색상 */
		opacity: 0.5; /* 투명도 */
		z-index: -1; /* 텍스트 위로 오지 않도록 */
	}
</style>
