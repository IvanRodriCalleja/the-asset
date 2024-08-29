'use client';

import { cloneElement, useRef } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { AriaToastProps, useToast } from '@react-aria/toast';
import { ToastState } from '@react-stately/toast';

import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

import { BaseButton } from '../Button';
import { ToastContent } from './GlobalRegion';

type ToastProps = AriaToastProps<ToastContent> & {
	state: ToastState<ToastContent>;
};

const ToastContainer = styled('div', {
	base: {
		pointerEvents: 'auto',
		position: 'relative',
		display: 'flex',
		w: 'full',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '4',
		overflow: 'hidden',
		rounded: 'md',
		border: 'base',
		p: '6',
		pr: '8',
		shadow: 'lg',
		transition: 'all',

		'&[data-swipe=cancel]': {
			transform: 'translateX(0)'
		},

		'&[data-swipe=end]': {
			transform: 'translateX(var(--radix-toast-swipe-end-x))',
			animateOut: true
		},

		'&[data-swipe=move]': {
			transform: 'translateX(var(--radix-toast-swipe-move-x))',
			transition: 'none'
		},

		'&[data-state=entering]': {
			animateIn: true,
			slideInFromLeft: '-100%',

			sm: {
				slideInFromLeft: '-100%'
			}
		},

		'&[data-state=exiting]': {
			animateOut: true,
			fadeOut: '0.8',
			slideOutToRight: '100%'
		}
	},
	variants: {
		variant: {
			default: {
				border: 'base',
				bg: 'background'
			},
			destructive: {
				border: 'destructive',
				bg: 'destructive',
				color: 'destructive.foreground'
			}
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type ToastVariant = StyledVariantProps<typeof ToastContainer>['variant'];

const CloseToastButton = styled(BaseButton, {
	base: {
		position: 'absolute',
		right: '2',
		top: '2',
		rounded: 'md',
		p: '1',
		ca: 'foreground/50',
		opacity: '0',
		transition: 'opacity',
		cursor: 'pointer',

		_hover: {
			color: 'foreground'
		},

		_groupHover: {
			opacity: '1'
		},

		_focus: {
			opacity: '1',
			outline: '2px solid transparent',
			outlineOffset: '2px',
			focusRingWidth: '2',
			focusRingColor: 'ring',
			focusRingOffsetWidth: '2'
		}
	},
	variants: {
		variant: {
			default: {},
			destructive: {
				color: 'red.300',

				_hover: {
					color: 'red.50'
				},

				_focus: {
					focusRingColor: 'red.400',
					focusRingOffsetColor: 'red.600'
				}
			}
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

const Title = styled('div', {
	base: {
		textStyle: 'sm',
		fontWeight: 'semibold'
	}
});

const Description = styled('div', {
	base: {
		textStyle: 'sm',
		opacity: '0.9'
	}
});

export const Card = ({ state, ...props }: ToastProps) => {
	const ref = useRef(null);
	const { toastProps, contentProps, titleProps, descriptionProps, closeButtonProps } = useToast(
		props,
		state,
		ref
	);

	const onAnimationEnd = () => {
		if (props.toast.animation === 'exiting') {
			state.remove(props.toast.key);
		}
	};

	return (
		<ToastContainer
			{...toastProps}
			ref={ref}
			className="group"
			data-state={props.toast.animation}
			onAnimationEnd={onAnimationEnd}
			variant={props.toast.content.variant}>
			<div {...contentProps}>
				<Title {...titleProps}>{props.toast.content.title}</Title>
				<Description {...descriptionProps}>{props.toast.content.description}</Description>
			</div>

			{props.toast.content.action &&
				// @ts-ignore
				cloneElement(props.toast.content.action, { variant: props.toast.content.variant })}

			<CloseToastButton {...closeButtonProps} variant={props.toast.content.variant}>
				<Cross2Icon />
			</CloseToastButton>
		</ToastContainer>
	);
};
