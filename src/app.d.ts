// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			// errorId: string;
		}

		interface Locals {
			loginInfo: { name: string; role: string } | null;
			isLogin: boolean;
			guestId: string | null;
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
