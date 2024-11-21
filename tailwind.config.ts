import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			white: '#fff'
			// Add our application colors here
		},

		extend: {
			fontFamily: {
				custom: ['Bauhaus93', 'sans-serif']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
