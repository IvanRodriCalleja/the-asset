import { PropsWithChildren, useLayoutEffect, useState } from 'react';

import { styled } from '@theasset/style-system/jsx';

import { useSidebar } from './SidebarContext';

const SidebarContainer = styled('div', {
	base: {
		zIndex: 3,
		position: {
			base: 'absolute',
			md: 'relative'
		},
		top: {
			base: 0,
			md: 'auto'
		},
		bottom: {
			base: 0,
			md: 'auto'
		},
		left: {
			base: 0,
			md: 'auto'
		},
		right: {
			base: 0,
			md: 'auto'
		},
		padding: {
			base: 6,
			sm: 8,
			lg: 12
		},
		width: {
			base: 'full',
			md: '480px'
		},
		minWidth: {
			base: 'full',
			md: '480px'
		},
		transitionProperty: 'top',
		transitionDuration: 'slow',
		transitionTimingFunction: 'ease-out'
	},
	variants: {
		isOpen: {
			true: {
				top: {
					base: '30%',
					md: 0
				}
			},
			false: {
				top: {
					base: 'calc(100% - var(--footer-height) - 24px)',
					md: 0
				}
			}
		}
	}
});

export const SidebarRootContainer = ({ children }: PropsWithChildren) => {
	const { isOpen, footerRef } = useSidebar();
	const [footerHeight, setFooterHeight] = useState(0);

	useLayoutEffect(() => {
		if (!footerRef.current) return;
		setFooterHeight(footerRef.current.clientHeight);
	}, [footerRef]);

	return (
		<SidebarContainer
			isOpen={isOpen}
			style={{ '--footer-height': `${footerHeight}px` } as React.CSSProperties}>
			{children}
		</SidebarContainer>
	);
};
