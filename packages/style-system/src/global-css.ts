import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
	html: {
		MozOsxFontSmoothing: 'grayscale',
		textRendering: 'optimizeLegibility',
		WebkitFontSmoothing: 'antialiased',
		WebkitTextSizeAdjust: '100%',
		tabSize: 4,
		fontFamily: 'sans',
		fontFeatureSettings: 'normal',
		fontVariationSettings: 'normal',
		'-webkit-tap-highlight-color': 'transparent',

		'@supports (font-synthesis-weight:none)': {
			fontSynthesis: 'initial',
			fontSynthesisWeight: 'none'
		}
	},
	body: {
		background: 'hsl(0 0% 98% / 1)',
		color: 'foreground',

		'&:before': {
			'--size': '116px',
			'--line': 'hsl(334deg 99% 31% / 50%)',
			content: '""',
			marginTop: '63px',
			position: 'fixed',
			background:
				'linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size), linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size)',
			mask: 'linear-gradient(160deg, transparent 29%, white)',
			transformStyle: 'flat',
			pointerEvents: 'none',
			zIndex: -1,
			rotate: '-25deg',
			overflow: 'hidden',
			height: '200vh',
			width: '200vw',
			top: '-50%',
			left: '-50%'
		}
	},
	button: {
		color: 'inherit',
		outline: '2px solid transparent'
	}
});
