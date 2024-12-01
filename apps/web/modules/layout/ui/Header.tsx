import Logo from 'assets/logo.svg';

import { css } from '@theasset/style-system/css';
import { HStack, styled } from '@theasset/style-system/jsx';
import { Link } from '@theasset/ui/next/link';

import { homePath } from 'routes';

const HeaderComponent = styled('header', {
	base: {
		position: 'sticky',
		top: 0,
		height: '4rem',
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
		borderBottomColor: 'rgba(10, 10, 10, 0.1)',
		backgroundColor: 'rgba(250, 250, 250, 0.6)',
		backdropFilter: 'blur(5px)',
		zIndex: 3
	}
});

const Nav = styled('nav', {
	base: {
		display: 'flex',
		alignItems: 'center',
		gap: '1.5rem',
		height: '100%',
		paddingInline: '1rem',
		maxWidth: '1400px',
		marginInline: 'auto'
	}
});

const Title = styled('h1', {
	base: {
		textStyle: 'h4',
		fontStretch: 'extra-expanded',
		cursor: 'pointer'
	}
});

const TheAssetLogo = styled(Logo, {
	base: {
		width: '24px',
		height: '24px'
	}
});

const linkClassName = css({ textDecoration: 'none !important' });

export const Header = () => (
	<HeaderComponent>
		<Nav>
			<Link href={homePath} className={linkClassName} variant="none">
				<HStack>
					<TheAssetLogo />
					<Title>
						<b>THEPDF</b>
					</Title>
				</HStack>
			</Link>
		</Nav>
	</HeaderComponent>
);
