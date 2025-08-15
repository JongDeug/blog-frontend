import Image from "next/image";
import logo from "@/assets/icon.png";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 tracking-tight">
      <section className="flex gap-2 w-fit items-center transition-all duration-200 hover:scale-105 hover:text-green-500">
        <Image src={logo} alt="" className="w-10 rounded-md" />
        <h1 className="text-3xl font-bold">Jongdeug</h1>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">꾸벅 🙇‍♂️</h2>
        <p className="whitespace-pre-line">
          {`안녕하세요! ✋ 이곳은 제가 개발자로써 경험하거나 학습한 내용들을 정리하기 위해 만든 공간입니다. 제가 작성한 글이 누군가에게 도움이 된다면 더할 나위 없을 것 같습니다:)`}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">목표</h2>
        <p className="whitespace-pre-line">
          {`프로그래밍은 가치를 만들어내는 도구라고 생각합니다. 도구를 잘 활용해서 가치를 만들어낼줄 아는 개발자가 될 것 입니다! 🔥`}
        </p>
      </section>
      <section className="tracking-tighter text-neutral-500 text-sm">
        <p>백엔드 개발자</p>
        <p>
          이메일:{" "}
          <a
            href="mailto:jongdeug2021@gmail.com"
            className="text-green-500 hover:underline"
          >
            jongdeug2021@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}
