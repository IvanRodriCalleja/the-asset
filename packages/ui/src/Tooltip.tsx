'use client';

import { Tooltip as AriaTooltip, OverlayArrow, TooltipTrigger } from 'react-aria-components';

import { styled } from '@theasset/style-system/jsx';

export { TooltipTrigger };

export const TooltipArrow = styled(OverlayArrow, {});

export const Tooltip = styled(AriaTooltip, {
	base: {
		zIndex: 50,
		overflow: 'hidden',
		rounded: 'md',
		bg: 'primary',
		px: '3',
		py: '1.5',
		textStyle: 'sm',
		color: 'primary.foreground',
		shadow: 'md',
		animateIn: true,
		fadeIn: 0,
		zoomIn: 95,

		'&[data-state=closed]': {
			animateOut: true,
			fadeOut: 0,
			zoomOut: 95
		},

		'&[data-side=top]': {
			slideInFromBottom: '2'
		},

		'&[data-side=bottom]': {
			slideInFromTop: '2'
		},

		'&[data-side=left]': {
			slideInFromRight: '2'
		},

		'&[data-side=right]': {
			slideInFromLeft: '2'
		}
	}
});
