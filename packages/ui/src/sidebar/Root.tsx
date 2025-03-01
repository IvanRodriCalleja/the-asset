import { PropsWithChildren } from 'react';

import { SidebarProvider } from './root/SidebarContext';
import { SidebarRootContainer } from './root/SidebarRootContainer';
import { SidebarContent } from './root/SplitPdfSidebarContent';

type RootProps = {
	defaultOpen?: boolean;
};

export const Root = ({ children, defaultOpen }: PropsWithChildren<RootProps>) => (
	<SidebarProvider defaultOpen={defaultOpen}>
		<SidebarRootContainer>
			<SidebarContent>{children}</SidebarContent>
		</SidebarRootContainer>
	</SidebarProvider>
);
