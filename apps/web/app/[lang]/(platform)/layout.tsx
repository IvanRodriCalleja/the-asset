import { Header } from 'modules/layout/ui/Header';
import { PropsWithChildren } from 'react';

const PlatformLayout = async ({ children }: PropsWithChildren) => (
	<>
		<Header />
		<main>{children}</main>
	</>
);

export default PlatformLayout;
