import { PropsWithChildren, useRef } from 'react';

import { useEnterAnimation } from '@react-aria/utils';

import { styled } from '@theasset/style-system/jsx';

type SplitPdfSidebarEnterAnimationProps = {
	className?: string;
};

const SplitPdfSidebarEnterAnimation = (
	props: PropsWithChildren<SplitPdfSidebarEnterAnimationProps>
) => {
	const ref = useRef<HTMLDivElement>(null);
	const entering = useEnterAnimation(ref);

	return <div ref={ref} data-entering={entering || false} {...props} />;
};

export const SplitPdfSidebarContent = styled(SplitPdfSidebarEnterAnimation, {
	base: {
		display: 'flex',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: '0',
		height: '100%',
		width: '100%',
		background: 'white',
		borderLeftStyle: {
			base: 'none',
			md: 'solid'
		},
		borderLeftWidth: {
			base: 0,
			md: '1px'
		},
		borderColor: 'border',
		transitionTimingFunction: 'ease-in-out',
		'--durations-fast': '400ms',

		'&[data-entering]': {
			animateIn: true,
			slideInFromRight: '100%'
		}
	}
});
