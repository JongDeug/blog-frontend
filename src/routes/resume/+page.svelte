<script>
	let name = '김종환';
	let profession = 'Back-End Developer';
	let links = [
		{ name: 'Birth', content: '1998/07/19', isLink: false },
		{ name: 'Address', content: '경상북도 구미시 신시로 8길 7-6', isLink: false },
		{ name: 'GitHub', url: 'https://github.com/JongDeug', isLink: true },
		{ name: 'Blog', url: 'https://jongdeug.port0.org', isLink: true },
		{ name: 'Email', url: 'jongdeug2021@gmail.com', isLink: true, isEmail: true }
	];
	let introduction = {
		name: '소개',
		content: `
		안녕하십니까! 
		<br/>
		<span class="font-bold">실패를 통해 배움의 가치를 깨닫고, 스스로를 가꾸고 있는 중인 김종환이라고 합니다.</span>
		<br/>
		아직 부족하지만 개발자로써 대체 불가능한 인재가 되는 것이 목표이며 꾸준히 노력하고 있습니다.
		`
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
			duration: '2024/06 ~ .',
			content: `라즈베리파이를 활용해 실제로 운영 중이며 개선해나가고 있는 블로그 프로젝트입니다. 
				<br/>
				소규모 프로젝트지만 기획부터 배포까지 경험해 볼 수 있었습니다.`
		}
	];
</script>

<div class="mx-auto max-w-4xl p-6 font-sans">
	<header class="mb-10">
		<div>
			<h1 class="highlight mb-2 text-4xl font-bold text-gray-800">{name}</h1>
			<p class="mb-2 text-xl font-bold text-gray-600">{profession}</p>
		</div>
		<div class="flex items-center justify-between gap-10">
			<div>
				<img
					src="https://jongdeug.port0.org/api/uploads/id-photo.jpg"
					alt=""
					class="rounded-3xl"
					width="300"
					height="300"
				/>
			</div>
			<table class="mx-auto w-full max-w-4xl">
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
		<h2 class=" mb-4 border-b-2 pb-2 text-2xl font-semibold text-gray-800">
			<span class="highlight">{introduction.name}</span>
		</h2>
		<p class="mt-4 text-lg">{@html introduction.content}</p>

		<div class="mt-4">
			<img class="" src="https://jongdeug.port0.org/api/uploads/resume-2.png" alt="" />
			<img class="" src="https://jongdeug.port0.org/api/uploads/resume-1.jpg" alt="" />
		</div>
	</section>

	<section class="mb-10">
		<h2 class="mb-4 border-b-2 pb-2 text-2xl font-semibold text-gray-800">
			<span class="highlight">스킬</span>
		</h2>
		<p class="mb-3">프로젝트에 적용해보았던 기술들입니다.</p>
		<p class="font-bold">Back-End</p>
		<div class="flex flex-wrap gap-1">
			<img
				src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"
				alt=""
			/>
		</div>
		<p class="mt-4 font-bold">DevOps</p>
		<div class="flex flex-wrap gap-1">
			<img
				src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"
				alt=""
			/>
		</div>
		<p class="mt-4 font-bold">Front-End</p>
		<div class="flex flex-wrap gap-1">
			<img
				src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"
				alt=""
			/>
			<img
				src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"
				alt=""
			/>
		</div>
	</section>

	<section class="mb-10">
		<h2 class="mb-4 border-b-2 pb-2 text-2xl font-semibold text-gray-800">
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
		<h2 class="mb-4 border-b-2 pb-2 text-2xl font-semibold text-gray-800">
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
		<h2 class="mb-4 border-b-2 pb-2 text-2xl font-semibold text-gray-800">
			<span class="highlight">프로젝트</span>
		</h2>
		<ul>
			{#each projects as project}
				<li class="mb-6">
					<h3 class="text-xl font-semibold text-gray-800">
						{project.name} / {project.member}
					</h3>
					<span class="text-gray-500">{project.duration}</span>

					<div class="mt-3">
						<p class="">
							<span class="font-bold">프로젝트 링크:</span>
							<a class="text-blue-500" href="https://jongdeug.port0.org/"
								>https://jongdeug.port0.org/</a
							>
						</p>
						<p class="">
							<span class="font-bold">Github 링크:</span>
							<a class="text-blue-500" href="https://github.com/JongDeug/blog-backend"
								>https://github.com/JongDeug/blog-backend</a
							>
						</p>
						<p class="">
							<span class="font-bold">트러블 슈팅 링크:</span>
							<a class="text-blue-500" href="https://github.com/users/JongDeug/projects/9/views/3"
								>https://github.com/users/JongDeug/projects/9/views/3</a
							>
						</p>
					</div>

					<div class="mt-5 flex flex-col gap-y-4">
						<p class="">
							<span class="block font-bold">[프로젝트 소개]</span>
							{@html project.content}
						</p>
						<div>
							<span class="font-bold">[주요 기능]</span>
							<ul>
								<li>- 게시판 CRUD</li>
								<li>- 비회원 댓글</li>
								<li>- 비회원 좋아요</li>
								<li>- 댓글 이메일 알림 기능</li>
							</ul>
						</div>
						<div>
							<span class="font-bold">[주요 성능 개선 사항]</span>
							<ul class="mt-1">
								<li class="font-bold">1. 사용자 인증 시스템</li>
								<p>
									<span class="font-bold">- 문제:</span> Refresh Token을 DB에 저장하여 성능 저하 발생
								</p>
								<p>
									<span class="font-bold">- 해결:</span> <br />
									<span class="ml-4">- 캐시를 활용해 DB 접근 없이 토큰 무효화 가능</span> <br />
									<span class="ml-4">- Access Token 캐싱으로 검증 속도 향상</span>
								</p>
								<p>
									<span class="font-bold">- 성과:</span> <br />

									<span class="ml-4"
										>- Access Token 사용 API 응답 시간: 37ms → 7ms (약 81% 단축)</span
									> <br />
									<span class="ml-4">- Refresh API 응답 시간: 95ms → 73ms (약 23% 단축)</span>
									<br />
									<span class="ml-4">- Logout API 응답 시간: 90ms → 57ms (약 36% 단축)</span> <br />
								</p>
							</ul>

							<ul class="mt-3">
								<li class="font-bold">2. 이미지 업로드 기능 개선</li>
								<p>
									<span class="font-bold">- 문제:</span> 게시글 Create API에 이미지 업로드 기능
									포함으로 성능 저하 <br />
								</p>
								<p>
									<span class="font-bold">- 해결:</span> <br />
									<span class="ml-4">- 이미지 업로드 API를 독립적으로 분리</span> <br />
									<span class="ml-4">- Nginx로 정적 이미지 처리</span> <br />
									<span class="ml-4">- Task Scheduling으로 24시간 지난 임시 이미지를 삭제</span>
								</p>
								<p>
									<span class="font-bold">- 성과:</span> <br />
									<span class="ml-4"
										>- 게시글 작성 API 응답 시간 72.16ms → 22.96ms (약 68% 단축)</span
									> <br />
									<span class="ml-4"
										>- 게시글 작성 취소 및 페이지 이탈 시 발생하는 불필요한 이미지 문제 해결</span
									>
									<br />
									<span class="ml-4">- 이미지 로딩 속도 향상</span> <br />
								</p>
							</ul>
						</div>
					</div>
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
