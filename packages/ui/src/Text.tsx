import { PropsWithChildren } from 'react';

import { RecipeVariantProps, cva } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';

type As = 'p' | 'span' | 'div' | 'label';
const textRecipe = cva({
	variants: {
		color: {
			textClear: { color: 'textClear' },
			destructive: { color: 'destructive' }
		},
		weight: {
			normal: { fontWeight: 'normal' },
			medium: { fontWeight: 'medium' },
			semibold: { fontWeight: 'semibold' },
			bold: { fontWeight: 'bold' },
			extrabold: { fontWeight: 'extrabold' }
		},
		family: {
			mono: { fontFamily: 'mono' }
		},
		size: {
			xs: {
				textStyle: 'xs'
			},
			sm: {
				textStyle: 'sm'
			},
			md: {
				textStyle: 'md'
			},
			lg: {
				textStyle: 'lg'
			},
			xl: {
				textStyle: 'xl'
			},
			'2xl': {
				textStyle: '2xl'
			},
			'3xl': {
				textStyle: '3xl'
			},
			'4xl': {
				textStyle: '4xl'
			},
			'5xl': {
				textStyle: '5xl'
			},
			'6xl': {
				textStyle: '6xl'
			},
			'7xl': {
				textStyle: '7xl'
			}
		}
	}
});
type TextVariants = RecipeVariantProps<typeof textRecipe>;

export type TextProps = TextVariants & {
	as?: As;
	className?: string;
};

export const Text = (props: PropsWithChildren<TextProps>) => {
	const { as = 'span', ...rest } = props;
	const Component = styled(as, textRecipe);

	return <Component {...rest} />;
};
