import { InputHTMLAttributes } from 'react';

import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

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
			outline: 'none',
			borderColor: 'primary',
			boxShadow: '0 0 0 1px var(--shadow-color)',
			shadowColor: 'primary'
		},

		_disabled: {
			cursor: 'not-allowed',
			opacity: '0.5'
		}
	},
	variants: {
		hasError: {
			true: {
				borderColor: 'destructive',
				_focusVisible: {
					borderColor: 'destructive',
					boxShadow: '0 0 0 1px var(--shadow-color)',
					shadowColor: 'destructive'
				}
			}
		}
	}
});

export type InputVariantProps = StyledVariantProps<typeof Input>;
export type InputProps = InputVariantProps & InputHTMLAttributes<HTMLInputElement>;
