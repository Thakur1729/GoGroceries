import type { Config } from 'tailwindcss';

const config = {
	theme: {
		extend: {
			colors: {
				primary: '#FF0000',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
