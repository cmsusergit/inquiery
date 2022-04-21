import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
			assets: 'build',
			precompress: false,
      fallback: 'index.html'
    }),
    
    prerender: {
			default: false
		}
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  trailingSlash: 'always',
};
export default config;


