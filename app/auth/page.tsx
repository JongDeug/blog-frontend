import Image from "next/image";
import logo from "../assets/icon.png";

export default function Page() {
  return (
    <section className="p-10 rounded-xl">
      <section className="mb-10 flex justify-center gap-2 items-center cursor-pointer transition-all duration-200 hover:scale-105 hover:text-green-500">
        <Image src={logo} alt="" className="w-10 rounded-md" />
        <h1 className="text-3xl font-bold tracking-tighter">Jongdeug</h1>
      </section>
      <form className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          로그인
        </button>
        <button
          type="button"
          className="py-2 px-4 border border-gray-300 rounded-md shadow hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.1 0 5.7 1.1 7.8 3.1l5.8-5.8C33.4 3.2 28.9 1 24 1 14.8 1 7.1 6.9 4.3 15.1l6.9 5.4C12.8 14.1 17.9 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3.1-2.4 5.7-4.9 7.4l7.6 5.9c4.4-4.1 7.1-10.2 7.1-17.8z"
            />
            <path
              fill="#FBBC05"
              d="M10.2 28.5c-1-3.1-1-6.4 0-9.5l-6.9-5.4C.4 17.1 0 20.5 0 24s.4 6.9 1.3 10l6.9-5.5z"
            />
            <path
              fill="#34A853"
              d="M24 47c6.5 0 12-2.1 16-5.7l-7.6-5.9c-2.2 1.5-5 2.4-8.4 2.4-6.1 0-11.2-4.1-13-9.6l-6.9 5.4C7.1 41.1 14.8 47 24 47z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          구글로 로그인
        </button>
      </form>
    </section>
  );
}
