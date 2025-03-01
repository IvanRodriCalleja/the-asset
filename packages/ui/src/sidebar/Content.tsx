import { Stack, styled } from '@theasset/style-system/jsx';

export const Content = styled(Stack, {
	base: {
		display: 'flex',
		overflow: 'hidden'
	},
	variants: {
		variant: {
			full: {},
			narrow: {
				paddingInline: {
					base: 6,
					sm: 8,
					lg: 12
				}
			}
		}
	},
	defaultVariants: {
		variant: 'full'
	}
});
