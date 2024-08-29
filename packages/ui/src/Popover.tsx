import { Popover as AriaPopover, Dialog, DialogTrigger, OverlayArrow } from 'react-aria-components';

import { styled } from '@theasset/style-system/jsx';

export const PopoverPanel = styled(Dialog, { base: { outline: 'none' } });

export const PopoverArrow = styled(OverlayArrow, {});
export const PopoverTrigger = DialogTrigger;

export const Popover = styled(AriaPopover, {
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
