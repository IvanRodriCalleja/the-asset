import { PropsWithChildren } from 'react';

import { styled } from '@theasset/style-system/jsx';

const ThumbnailActionsContainer = styled('div', {
	base: {
		position: {
			base: 'relative',
			md: 'absolute'
		},
		width: 'fit-content',
		display: 'flex',
		gap: '1px',
		right: 1,
		top: 1,
		background: 'neutral.400',
		zIndex: 2,
		overflow: 'hidden',
		borderRadius: 'md',
		boxShadow: 'xl'
	}
});

export const Actions = ({ children }: PropsWithChildren) => (
	<ThumbnailActionsContainer data-part="actions">{children}</ThumbnailActionsContainer>
);
