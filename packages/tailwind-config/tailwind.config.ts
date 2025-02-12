import type { Config } from 'tailwindcss';

const config = {
	theme: {
		extend: {
			colors: {
				// primary: '#FF0000',
				primary: '#FFF00',
				green: '#0C831F',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
