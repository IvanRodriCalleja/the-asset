'use client';

import { ReactNode } from 'react';

import { AriaToastProps } from '@react-aria/toast';
import { ToastQueue, useToastQueue } from '@react-stately/toast';
import { createPortal } from 'react-dom';

import { ToastVariant } from './Card';
import { Region } from './Region';

export type ToastContent = {
	title: string;
	description: string;
	action?: ReactNode;
	variant?: ToastVariant;
};

export const toastQueue = new ToastQueue<ToastContent>({
	maxVisibleToasts: 5,
	hasExitAnimation: true
});

type GlobalRegionProps = Omit<AriaToastProps<ToastContent>, 'toast'>;

export const GlobalRegion = (props: GlobalRegionProps) => {
	const state = useToastQueue(toastQueue);

	return state.visibleToasts.length > 0
		? createPortal(<Region {...props} state={state} />, document.body)
		: null;
};
