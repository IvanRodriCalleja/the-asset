'use client';

import { useRef } from 'react';

import { AriaToastRegionProps, useToastRegion } from '@react-aria/toast';
import { ToastState } from '@react-stately/toast';

import { styled } from '@theasset/style-system/jsx';

import { Card } from './Card';
import { ToastContent } from './GlobalRegion';

type ToastRegionProps = AriaToastRegionProps & {
	state: ToastState<ToastContent>;
};

const ToastRegion = styled('div', {
	base: {
		base: {
			display: 'flex',
			gap: 2,
			position: 'fixed',
			top: '0',
			zIndex: 100,
			maxH: 'screen',
			w: 'full',
			flexDirection: 'column-reverse',
			p: '4',

			sm: {
				bottom: '0',
				right: '0',
				top: 'auto'
			},

			md: {
				maxW: '420px'
			}
		}
	}
});

export const Region = ({ state, ...props }: ToastRegionProps) => {
	const ref = useRef(null);
	const { regionProps } = useToastRegion(props, state, ref);

	return (
		<ToastRegion {...regionProps} ref={ref} className="toast-region">
			{state.visibleToasts.map(toast => (
				<Card key={toast.key} toast={toast} state={state} />
			))}
		</ToastRegion>
	);
};
