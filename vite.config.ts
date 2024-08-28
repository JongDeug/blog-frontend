import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	server: {
		port: 5000
	},
	preview: {
		port: 5000
	},
	plugins: [mkcert(), sveltekit()]
});
