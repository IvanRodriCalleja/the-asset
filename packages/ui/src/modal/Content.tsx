import { PropsWithChildren } from 'react';

import { Overlay } from '@react-aria/overlays';

import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

import { Dialog } from '../Dialog';
import { useAgModal } from '../Modal';

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
		background: 'rgba(0, 0, 0, .8)'
	}
});

export const ModalContent = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		bg: 'background',
		padding: '24',
		borderRadius: 'lg',
		maxHeight: 'calc(100% - 4rem)'
	},
	variants: {
		size: {
			alert: {
				maxWidth: '37.5rem',
				width: '100%'
			},
			dialog: {
				maxWidth: '25rem',
				width: '100%'
			},
			none: {
				maxWidth: 'unset',
				padding: 0,
				borderRadius: 0,
				background: 'transparent'
			}
		}
	},
	defaultVariants: {
		size: 'alert'
	}
});

type ContentProps = {
	size?: StyledVariantProps<typeof ModalContent>['size'];
};

export const Content = ({ children, size = 'dialog' }: PropsWithChildren<ContentProps>) => {
	const { state, underlayProps, modalProps, modalRef, variant } = useAgModal();

	return (
		<>
			{state.isOpen && (
				<Overlay>
					<ModalOverlay {...underlayProps}>
						<Dialog role={variant === 'alert' ? 'alertdialog' : 'dialog'}>
							<ModalContent size={size} {...modalProps} ref={modalRef}>
								{children}
							</ModalContent>
						</Dialog>
					</ModalOverlay>
				</Overlay>
			)}
		</>
	);
};
