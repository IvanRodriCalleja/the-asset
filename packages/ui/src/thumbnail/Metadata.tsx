import { PropsWithChildren } from 'react';

import { styled } from '@theasset/style-system/jsx';

export const Metadata = styled('div', {
	base: {
		display: 'flex',
		flex: {
			base: 1,
			md: 0
		},
		minWidth: 0,
		flexDirection: 'column',
		alignItems: {
			base: 'flex-start',
			md: 'center'
		},
		justifyContent: 'center',
		gap: {
			base: '10px',
			md: 2
		}
	}
});

const Name = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs',
		width: '100%',
		textAlign: {
			base: 'start',
			md: 'center'
		}
	}
});

export const FileName = ({ children }: PropsWithChildren) => (
	<Name data-testid="pdf-name">{children}</Name>
);
