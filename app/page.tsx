import { BlogPosts } from "app/components/posts";
import Image from "next/image";
import logo from "./assets/icon.png";

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex gap-2 w-fit items-center cursor-pointer transition-all duration-200 hover:scale-105 hover:text-green-500">
        <Image src={logo} alt="" className="w-10 rounded-md" />
        <h1 className="text-3xl font-bold tracking-tighter">Jongdeug</h1>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tighter mb-2">
          꾸벅 🙇‍♂️
        </h2>
        <p className="whitespace-pre-line">
          {`안녕하세요! ✋ 이곳은 제가 학습한 내용들을 정리하고, 공유하기 위해 만든 공간입니다.
도움이 될만한 글을 작성하려고 늘 노력하고 있습니다. 여러분의 소중한 피드백은 성장하는데 큰 도움이 됩니다.`}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tighter mb-2">목표</h2>
        <p className="whitespace-pre-line">
          {`프로그래밍은 가치를 만들어내는 도구라고 생각합니다. 도구를 활용해서 맛있는 피자 한 판을 만들어 팔 줄 아는 개발자가 되고 싶습니다.`}
        </p>
      </section>
      <div>
        <BlogPosts />
      </div>
    </div>
  );
}
