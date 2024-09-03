// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			status: number;
		}

		interface Locals {
			isLogin: boolean;
			info?: {
				username: string;
				role: number;
			}
			guestLikeId: string | undefined;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
