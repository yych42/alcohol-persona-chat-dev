/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class' // only generate classes
		})
	],

	safelist: [
		{
			pattern: /bg-blue-.+/
		},
		{
			pattern: /bg-green-.+/
		},
		{
			pattern: /bg-orange-.+/
		},
		{
			pattern: /text-blue-.+/
		},
		{
			pattern: /text-green-.+/
		},
		{
			pattern: /text-orange-.+/
		}
	]
};

module.exports = config;
