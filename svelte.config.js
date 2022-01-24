import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const MODE = process.env.NODE_ENV
// const production = MODE === 'production';
const development = MODE === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			plugins: [
				// ↓ Have to check the mode here because this cant run on build
				development && nodePolyfills({
					include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
				}),

			],
			build: {
				rollupOptions: {
					plugins: [
						// ↓ Needed for WalletConnect build
						nodePolyfills()
					]
				  },
				// ↓ Needed for WalletConnect build
				commonjsOptions: {
					transformMixedEsModules: true
				}
			},
			resolve:{
				alias:{
					// ↓ see https://github.com/vitejs/vite/issues/6085
					"@ensdomains/address-encoder": "@ensdomains/address-encoder/lib/index.umd.js",
				},
			},
		}
	}
};

export default config;
