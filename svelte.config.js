import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md'],

    preprocess: [
        mdsvex({
            extensions: ['.md']
        })
    ],

    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null
        }),

        paths: {
            base: dev ? '' : '/the-living-grid'
        }
    }
};

export default config;
