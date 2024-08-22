import { styled } from '@theasset/style-system/jsx';

export const Action = styled('div', {
	base: {
		display: 'inline-flex',
		h: '8',
		flexShrink: '0',
		alignItems: 'center',
		justifyContent: 'center',
		rounded: 'md',
		border: 'base',
		bg: 'transparent',
		px: '3',
		textStyle: 'sm',
		fontWeight: 'medium',
		focusRingOffsetColor: 'background',
		transition: 'colors',
		cursor: 'pointer',

		_hover: {
			bg: 'secondary'
		},

		_focus: {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			focusRingWidth: '2',
			focusRingColor: 'ring',
			focusRingOffsetWidth: '2'
		},

		_disabled: {
			pointerEvents: 'none',
			opacity: '0.5'
		}
	},
	variants: {
		variant: {
			default: {},
			destructive: {
				bca: 'muted/40',

				_hover: {
					bca: 'destructive/30',
					bg: 'destructive',
					color: 'destructive.foreground'
				},

				_focus: {
					focusRingColor: 'destructive'
				}
			}
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});
