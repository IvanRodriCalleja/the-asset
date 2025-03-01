import { PropsWithChildren } from 'react';

import { Stack, styled } from '@theasset/style-system/jsx';

import { useSidebar } from './root/SidebarContext';

const FooterContainer = styled(Stack, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 'fit-content',
		paddingInline: {
			base: 6,
			sm: 8,
			lg: 12
		},
		paddingBottom: {
			base: 6,
			sm: 8,
			lg: 12
		}
	}
});

export const Footer = ({ children }: PropsWithChildren) => {
	const { footerRef } = useSidebar();

	return <FooterContainer ref={footerRef}>{children}</FooterContainer>;
};
