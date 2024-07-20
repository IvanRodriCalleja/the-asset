'use client';

import { PropsWithChildren, useRef } from 'react';
import { useButton, AriaButtonProps } from '@react-aria/button';

import { styled } from '@theasset/style-system/jsx';
import { cva } from '@theasset/style-system/css';
import { StyledVariantProps } from '@theasset/style-system/types';

export const buttonRecipe = cva({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		rounded: 'md',
		textStyle: 'sm',
		fontWeight: 'medium',
		transition: 'colors',
		cursor: 'pointer',
		focusRingOffsetColor: 'background',
		gap: '2',

		_focusVisible: {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			focusRingWidth: '2',
			focusRingColor: 'ring',
			focusRingOffsetWidth: '2'
		},

		_disabled: {
			pointerEvents: 'none',
			opacity: '50%'
		}
	},
	variants: {
		variant: {
			primary: {
				bg: 'primary',
				color: 'primary.foreground',

				_hover: {
					bga: 'primary/90'
				}
			},
			destructive: {
				bg: 'destructive',
				color: 'destructive.foreground',

				_hover: {
					bga: 'destructive/90'
				}
			},
			outline: {
				border: 'input',
				bg: 'background',

				_hover: {
					bg: 'accent',
					color: 'accent.foreground'
				}
			},
			secondary: {
				bg: 'secondary',
				color: 'secondary.foreground',

				_hover: {
					bga: 'secondary/90'
				}
			},
			ghost: {
				_hover: {
					bg: 'accent',
					color: 'accent.foreground'
				}
			},
			link: {
				color: 'primary',
				textUnderlineOffset: '4px',

				_hover: {
					textDecoration: 'underline'
				}
			}
		},
		size: {
			default: {
				h: '10',
				px: '4',
				py: '2'
			},
			sm: {
				h: '9',
				rounded: 'md',
				px: '3'
			},
			lg: {
				h: '11',
				rounded: 'md',
				px: '8'
			},
			icon: {
				h: '10',
				w: '10'
			}
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'default'
	}
});

const StyledButton = styled('button', buttonRecipe);

export type ButtonVariant = StyledVariantProps<typeof StyledButton> & AriaButtonProps;

type ButtonProps = ButtonVariant;

export const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);

	const { size, variant } = props;

	return (
		<StyledButton {...buttonProps} size={size} variant={variant}>
			{children}
		</StyledButton>
	);
};
