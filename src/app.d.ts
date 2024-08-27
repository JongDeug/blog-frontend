// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			isLogin: boolean;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Post {
			id: string;
			title: string;
			content: string;
			createdAt: string; // 날짜 형식에 맞춰 Date 객체로 변경할 수 있습니다.
			tags: string[];
		}

		interface Comment {
			id: string;
			content: string;
			author: { id: string; name: string; } | null;
			guest: { id: string; nickName: string; email: string; } | null;
			childComments: Comment[];
		}

		interface Category {
			name: string;
			count: number;
		}
	}
}

export {};
