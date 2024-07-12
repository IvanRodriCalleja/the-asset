import { styled } from '@theasset/style-system/jsx';
import { Header } from 'modules/layout/ui/Header';
import { PropsWithChildren } from 'react';

const Main = styled('main', {
	base: {
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: 'full',
		height: 'full',
		position: 'relative'
	}
});

const PlatformLayout = async ({ children }: PropsWithChildren) => (
	<>
		<Header />
		<Main>{children}</Main>
	</>
);

export default PlatformLayout;
