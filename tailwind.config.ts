import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				white: '#fff',
				app_pink: '#E018FF',
				deep_dark_purple: '#1E0447',
				dark_purple: '#823FFF',

				app_green: '#80FF77'
				// Add our application colors here
			},
			fontFamily: {
				bauhaus93: ['Bauhaus93', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif']
			},
			boxShadow: {
				wallet: '0 0 30px 0 #9747FF',
				approve: '0 0 30px 0 #E018FF'
			}
		}
	},

	plugins: [typography]
} satisfies Config;
