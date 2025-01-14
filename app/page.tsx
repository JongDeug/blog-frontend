import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter cursor-pointer transition-all duration-150 hover:scale-105 hover:text-green-500">
        Jongdeug
      </h1>
      <h2 className="mb-8 text-2xl font-semibold tracking-tighter">꾸벅 🙇‍♂️</h2>
      <p className="mb-4 whitespace-pre-line">
        {`안녕하세요!✋ 이곳은 제가 학습한 내용들을 정리하고, 공유하기 위해 만든 공간입니다.
도움이 될만한 글을 작성하려고 늘 노력하고 있습니다. 여러분의 소중한 피드백은 성장하는데 큰 도움이 됩니다.
\n프로그래밍은 가치를 만들어내는 도구입니다. 도구를 활용해서 맛있는 피자 한 판을 만들어 팔 줄 아는 개발자가 될 겁니다!!
`}
      </p>
      {/* <h3 className="mb-3 text-xl font-semibold tracking-tighter">About</h3>
      <p>{`안녕하세요! ✋ 블로그 운영자 김종환이라고 합니다. 저는 백엔드 개발자를 희망하고 있는 학생입니다. 
      학부에서 여러 주제로 팀 프로젝트를 진행해봤지만 실질적으로 유지 보수 및 운영하고있는 프로젝트가 없었습니다. 
      그동안 설계와 구현에만 집중하고 있었다는 것을 깨달았고, 유저가 한 명이라도 괜찮으니 직접 서비스를 운영해보는 경험이 필요하다는 생각이 들었습니다. 
      이 블로그는 제 서비스 운영 경험의 첫 걸음입니다. 근성있고 책임감을 가진 개발자가 되는 것이 제 목표입니다. 
      남들보다 늦더라도 꾸준히 해낸다면 블로그 로고처럼 상승하는 그래프를 그릴 수 있을거라 확신합니다. 
      말하는 대로, 믿는 대로 이루어집니다! 오늘도 좋은 하루 보내시길 바랍니다 :)`}</p> */}
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
