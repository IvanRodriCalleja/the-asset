import { PropsWithChildren } from 'react';

import { Dialog } from '../Dialog';
import { useAgModal } from '../Modal';
import { styled } from '@theasset/style-system/jsx';
import { Overlay as AriaOverlay } from '@react-aria/overlays';

const ModalOverlay = styled('div', {
	base: {
		position: 'fixed',
		zIndex: '10',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'background/80'
	}
});

type ContentProps = {};

export const Overlay = ({ children }: PropsWithChildren<ContentProps>) => {
	const { underlayProps, state, variant } = useAgModal();

	return (
		<>
			{state.isOpen && (
				<AriaOverlay>
					<ModalOverlay {...underlayProps}>
						<Dialog role={variant === 'alert' ? 'alertdialog' : 'dialog'} boxShadow="lg">
							{children}
						</Dialog>
					</ModalOverlay>
				</AriaOverlay>
			)}
		</>
	);
};
