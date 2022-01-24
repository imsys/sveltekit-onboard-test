import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

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
