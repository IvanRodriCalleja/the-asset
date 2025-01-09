import { Stack, styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

export const Root = styled(Stack, {
	base: {
		position: 'relative',
		padding: 4,
		paddingBottom: {
			base: 0,
			md: 4
		},
		gap: 2,
		borderRadius: 'md',
		transition: 'background-color 0.2s',
		background: {
			base: '#f3eaff',
			md: 'transparent'
		},
		width: {
			base: '100%',
			md: 180
		},

		'& [data-part="actions"]': {
			opacity: {
				base: 1,
				md: 0
			},
			transition: 'opacity 0.2s ease-in-out'
		},
		'&:hover [data-part="actions"]': {
			opacity: 1
		},

		_hover: {
			background: '#f3eaff'
		}
	},
	variants: {
		status: {
			default: {},
			warning: {
				background: '#ff3358b3',

				_hover: {
					background: '#ff3358cc'
				}
			},
			active: {
				background: '#f3eaff'
			}
		}
	},
	defaultVariants: {
		status: 'default'
	}
});

export type RootVariants = StyledVariantProps<typeof Root>;
