import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">꾸벅 🙇‍♂️</h1>
      <p className="mb-4">
        {`안녕하세요!✋ 이곳은 제가 학습한 내용들을 정리하고, 공유하기 위해 만든 공간입니다.
도움이 될만한 글을 작성하려고 늘 노력하고 있습니다. 부족해도 너그러이 봐주시면 정말 감사하겠습니다.
여러분의 소중한 피드백은 성장하는데 큰 도움이 됩니다.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
