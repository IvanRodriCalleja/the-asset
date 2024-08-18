'use client';

import { ComponentPropsWithoutRef, ElementRef, PropsWithChildren, forwardRef } from 'react';

import {
	Arrow,
	Content,
	Provider,
	Root,
	TooltipProps,
	TooltipTriggerProps,
	Trigger
} from '@radix-ui/react-tooltip';

import { styled } from '@theasset/style-system/jsx';

const ToolContent = styled(Content, {
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

const ToolTrigger = styled(Trigger, {});

const TooltipContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<ToolContent ref={ref} sideOffset={sideOffset} className={className} {...props}>
		{props.children}
		<Arrow />
	</ToolContent>
));

const TooltipRoot = (props: PropsWithChildren<TooltipProps>) => (
	<Provider delayDuration={0}>
		<Root {...props} />
	</Provider>
);

const TooltipTrigger = (props: PropsWithChildren<TooltipTriggerProps>) => (
	<ToolTrigger {...props} />
);

export const Tooltip = {
	Root: TooltipRoot,
	Trigger: TooltipTrigger,
	Content: TooltipContent
};
