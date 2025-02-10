import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-[300px] flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-semibold">페이지를 찾을 수 없습니다.</h2>
      <p className="text-gray-600">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-400"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
