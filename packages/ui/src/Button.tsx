'use client';

import { PropsWithChildren, forwardRef } from 'react';

import { AriaButtonProps, useButton } from '@react-aria/button';
import { useObjectRef } from '@react-aria/utils';

import { cva } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';
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
			transparent: {
				bg: 'transparent',
				borderRadius: 'none',

				_focusVisible: {
					outline: '2px solid transparent',
					outlineOffset: '2px',
					focusRingWidth: '0',
					focusRingColor: 'transparent',
					focusRingOffsetWidth: '0'
				},

				_hover: {
					bg: 'rgba(0, 0, 0, 0.1)'
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
			none: {
				h: 'auto',
				px: '0',
				py: '0'
			},
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
			xl: {
				h: '12',
				rounded: 'md',
				px: '10'
			},
			'2xl': {
				h: '14',
				rounded: 'md',
				px: '12'
			},
			icon: {
				h: '10',
				w: '10',

				'& svg': {
					w: '4',
					h: '4'
				}
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

export type ButtonProps = ButtonVariant & {
	className?: string;
};

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
	({ children, ...props }, ref) => {
		const objRef = useObjectRef(ref);
		const { buttonProps } = useButton(props, objRef);

		const { size, variant, className } = props;

		return (
			<StyledButton
				{...buttonProps}
				className={className}
				ref={objRef}
				size={size}
				variant={variant}>
				{children}
			</StyledButton>
		);
	}
);
