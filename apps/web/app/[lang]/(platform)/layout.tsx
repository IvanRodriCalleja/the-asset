import { PropsWithChildren } from 'react';

import { LocaleParam } from '@theasset/internationalization/domain/locale-param';
import { styled } from '@theasset/style-system/jsx';

import { Header } from 'modules/layout/ui/Header';

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

const PlatformLayout = ({ children }: PropsWithChildren<LocaleParam>) => (
	<>
		<Header />
		<Main>{children}</Main>
	</>
);

export default PlatformLayout;
