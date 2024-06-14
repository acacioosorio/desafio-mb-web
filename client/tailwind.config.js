/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				yellow: {
					DEFAULT: '#ff9900', // Customize this hex value to your desired yellow
					'50': '#ffc368',
					'100': '#ffbc58',
					'200': '#ffb545',
					'300': '#ffac30',
					'400': '#ffa31a',
					'500': '#ff9900',
					'600': '#e68a00',
					'700': '#cf7c00',
					'800': '#ba7000',
					'900': '#a76400'
				}
			}
		},
	},
	plugins: [],
}

