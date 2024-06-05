import { withAnimations } from 'animated-tailwindcss';

/** @type {import('tailwindcss').Config} */
export default withAnimations({
	content: [
		'./{app,components,feats,layouts}/**/*.{ts,tsx}', //
		'../../packages/@nilswg-site/{ui,feat}/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				myblack: 'rgb(28 29 37)'
			},
			fontFamily: {
				belle: ['var(--font-belle)'],
				russon: ['var(--font-russon)'],
				orbitron: ['var(--font-orbitron)'],
				play: ['var(--font-play)'],
				outfit: ['var(--font-outfit)'],
				zhtw: ['var(--font-roboto)', 'var(--font-notosans-tc)'],
				notosans: ['var(--font-notosans-tc)'],
				roboto: ['var(--font-roboto)'],
				roboto_condensed: ['var(--font-roboto-condensed)'],
			},
			spacing: {
				navbar: 'var(--navbar-height)',
				footer: 'var(--footer-height)',
				section: 'calc(100vh - var(--navbar-height)'
			},
			screens: {
				xs: '360px',
			},
			keyframes: {
				spin: {
					from: {
						transform: 'rotate(0deg)'
					},
					to: {
						transform: 'rotate(360deg)'
					}
				},
				sky400: {
					to: { color: "rgb(56 189 248)" }
				},
				rotating: {
					"0%": { "transform": "rotate(0deg)" },
					"100%": { "transform": "rotate(360deg)" },
				},
				rocketdot: {
					'0%': {
						"opacity": '1',
						"transform": "scale(0)",
					},
					'10%': {
						"transform": "scale(1.2)"
					},
					'80%, 100%': {
						"opacity": '0',
						"transform": "scale(0)"
					}
				}
			},
			boxShadow: {
				card: '5px 5px 20px rgba(75, 85, 99, 1)'
			},
		},
	},
	plugins: [],
})
