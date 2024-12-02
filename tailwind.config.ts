import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				// Add our application colors here
				white: '#fff',
				app_pink: '#E018FF',
				deep_dark_purple: '#1E0447',
				dark_purple: '#823FFF',
				app_green: '#80FF77'
			},
			fontFamily: {
				bauhaus93: ['Bauhaus93', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif']
			},
			boxShadow: {
				'app-button': '0 0 30px 0'
			},
			borderWidth: {
				'3': '3px'
			},
			borderRadius: {
				'4xl': '3rem'
			}
		}
	},

	plugins: [typography]
} satisfies Config;
