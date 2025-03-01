import { PropsWithChildren, useRef } from 'react';

import { useEnterAnimation } from '@react-aria/utils';

import { styled } from '@theasset/style-system/jsx';

import { useSidebar } from './SidebarContext';

const MobileBadge = styled('div', {
	base: {
		position: 'absolute',
		top: 2,
		right: '50%',
		transform: 'translateX(50%)',
		height: 2,
		width: 20,
		backgroundColor: 'border',
		borderRadius: '8px',
		zIndex: 1,
		display: {
			base: 'block',
			md: 'none'
		}
	}
});

export const SidebarContent = ({ children }: PropsWithChildren) => {
	const ref = useRef<HTMLDivElement>(null);
	const entering = useEnterAnimation(ref);
	const { toggleOpen } = useSidebar();

	return (
		<SidebarAnimatedContainer ref={ref} data-entering={entering || false}>
			<MobileBadge onClick={toggleOpen} />
			{children}
		</SidebarAnimatedContainer>
	);
};

const SidebarAnimatedContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
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
		borderTopRadius: {
			base: 'lg',
			md: '0'
		},
		boxShadow: {
			base: '0px -1px 20px 1px rgba(0,0,0,0.8)',
			md: 'none'
		},
		overflow: 'hidden',
		borderColor: 'border',
		transitionTimingFunction: 'ease-in-out',
		'--durations-fast': '400ms',

		'&[data-entering]': {
			animateIn: true,
			slideInFromRight: {
				base: '0',
				md: '100%'
			},
			slideInFromBottom: {
				base: '100%', // TODO: Check
				md: '0'
			}
		}
	}
});
