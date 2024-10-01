import { PropsWithChildren } from 'react';

import { Dialog, DialogTrigger, OverlayArrow, Popover, PopoverProps } from 'react-aria-components';

import { styled } from '@theasset/style-system/jsx';

export const PopoverArrow = styled(OverlayArrow, {});
export const PopoverTrigger = DialogTrigger;

const PopoverDialog = styled(Dialog, { base: { outline: 'none' } });
const PopoverRoot = styled(Popover, {
	base: {
		zIndex: 50,
		rounded: 'md',
		border: 'base',
		bg: 'popover',
		p: '4',
		color: 'popover.foreground',
		boxShadow: 'md',
		outline: 'none',

		'&[data-entering]': {
			animateIn: true,
			fadeIn: 0,
			zoomIn: 95
		},

		'&[data-exiting]': {
			animateOut: true,
			fadeOut: 0,
			zoomOut: 95
		},

		'&[data-placement=top]': {
			slideInFromBottom: '2'
		},

		'&[data-placement=bottom]': {
			slideInFromTop: '2'
		},

		'&[data-placement=left]': {
			slideInFromRight: '2'
		},

		'&[data-placement=right]': {
			slideInFromLeft: '2'
		}
	}
});

export const PopoverPanel = ({ children, ...props }: PropsWithChildren<PopoverProps>) => (
	<PopoverRoot {...props}>
		<PopoverDialog>{children}</PopoverDialog>
	</PopoverRoot>
);
