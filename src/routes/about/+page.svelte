<script>
	import Head from '$lib/components/layout/Head.svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { config } from '$lib/config';
	import Title from '$lib/components/Title.svelte';

	const goals = [
		'1. 실제 서비스 운영에서 겪을 수 있는 다양한 문제들을 직접 경험하고 개선할 수 있도록 한다.',
		'2. 지속적으로 코드 품질을 개선한다.',
		'3. 위와 같은 활동들을 통해 자연스럽게 포트폴리오를 강화한다.',
		'4. 개인 브랜딩을 통해 나의 가치를 높일 수 있도록 한다.'
	];
</script>

<Head title="About" />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pt-6 pb-8 md:space-y-5">
		<Title title="About" />
	</div>
	<div class="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
		<div class="flex flex-col items-center py-6">
			<img src={config.siteLogo} alt="logo" class="h-64 w-64 rounded" />
			<div class="flex space-x-2 pt-4">
				<SocialIcon icon="mail" url={`mailto:${config.email}`} />
				<SocialIcon icon="github" url={config.github} />
				<SocialIcon icon="linkedin" url={config.linkedin} />
			</div>
		</div>
		<div class="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
			안녕하세요! ✋ 블로그 운영자 <strong>김종환</strong>이라고 합니다. 저는 백엔드 개발자를 희망하고 있는 학생입니다.
			학부에서 여러 주제로 팀 프로젝트를 진행해봤지만 실질적으로 유지 보수 및 운영하고있는 프로젝트가 없었습니다.
			그동안 설계와 구현에만 집중하고 있었다는 것을 깨달았고, 유저가 한 명이라도 괜찮으니 직접 서비스를 운영해보는 경험이 필요하다는 생각이 들었습니다.
			이 블로그는 제 서비스 운영 경험의 첫 걸음입니다.
			<br>
			<br>
			<!--			아무리 어려운 문제가 다가와도 어떻게든 해결할 줄 아는 그런 개발자가 되고싶습니다.-->
			삶은 험난한 곡선으로 이뤄져있습니다. 남들보다 늦더라도 긴 호흡으로 꾸준히 무언가를 한다면 블로그 로고처럼 상승하는 그래프를 그릴 수 있을거라 확신합니다.
			같이 함께 여정을 이어가면 좋겠습니다. 좋은 하루 보내시길 바랍니다.
		</div>
	</div>
	<div class="space-y-2 py-8 md:space-y-5">
		<Title h2 title="Goals" />
		<div class="grid gap-5 prose dark:prose-dark">
			{#each goals as goal}
				<div class="lg:flex flex-row space-x-3">
					{goal}
				</div>
			{/each}
		</div>
	</div>
</div>
