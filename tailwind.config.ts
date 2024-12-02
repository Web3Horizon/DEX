import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animations from '@midudev/tailwind-animations';

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
			},
			fontFamily: {
				bauhaus93: ['Bauhaus93', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif']
			},
			boxShadow: {
				'app-button': '0 0 30px 0', // Added the missing comma here
				'top-footer': '0 5px 6px 12px rgba(224, 24, 255, 1)' // Shadow on the top
			},
			borderWidth: {
				'3': '3px'
			},
			keyframes: {
				pulseLight: {
					'0%, 100%': { boxShadow: '0 5px 6px 12px rgba(224, 24, 255, 0.25)' },
					'50%': { boxShadow: '0 5px 6px 12px rgba(224, 24, 255, 1)' }
				}
			},
			animation: {
				pulseLight: 'pulseLight 5s ease-in-out infinite'
			}
		}
	},

	plugins: [typography, animations]
};
