import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			sans: ['Noto Sans KR']
		},
		screens: {
			sm: { min: '390px', max: '819px' },
			md: { min: '820px' },
			lg: { min: '1080px' }
		}
	},

	plugins: []
} satisfies Config;
