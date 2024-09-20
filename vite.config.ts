import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	base: process.env.NODE_ENV === 'production' ? '/vue-password-generator/' : '/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		outDir: './dist/',
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/goTuda--bundle.js',
				assetFileNames: 'assets/[name].[ext]',
			},
		},
	},
});
