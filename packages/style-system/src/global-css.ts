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
		bg: 'background',
		color: 'foreground'
	},
	button: {
		color: 'inherit',
		outline: '2px solid transparent'
	}
});
