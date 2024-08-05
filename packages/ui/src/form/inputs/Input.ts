import { styled } from '@theasset/style-system/jsx';

export const Input = styled('input', {
	base: {
		display: 'flex',
		h: '10',
		w: 'full',
		rounded: 'md',
		border: 'input',
		bg: 'background',
		px: '3',
		py: '2',
		textStyle: 'sm',
		focusRingOffsetColor: 'background',

		_file: {
			border: 'none',
			bg: 'transparent',
			textStyle: 'sm',
			fontWeight: 'medium'
		},

		_placeholder: {
			color: 'muted.foreground'
		},

		_focusVisible: {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(24, 24, 27) 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px'
		},

		_disabled: {
			cursor: 'not-allowed',
			opacity: '0.5'
		}
	}
});
