import { PropsWithChildren } from 'react';

import { Overlay as AriaOverlay } from '@react-aria/overlays';

import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

import { Dialog } from '../Dialog';
import { useAgModal } from '../Modal';
import { Overlay } from '../Overlay';

export const ModalContent = styled('div', {
	base: {
		bg: 'background',
		borderRadius: 'lg',
		maxHeight: 'calc(100% - 4rem)',
		zIndex: 50,
		display: 'grid',
		w: 'full',
		maxWidth: 'lg',
		transitionDuration: 'normal',
		gap: '4',
		border: 'base',
		p: '6',
		boxShadow: 'lg',

		'&[data-state=open]': {
			animateIn: true,
			fadeIn: 0,
			zoomIn: 95
		},

		'&[data-state=closed]': {
			animateOut: true,
			fadeOut: 0,
			zoomOut: 95
		},

		sm: {
			rounded: 'lg'
		}
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
	className?: string;
	size?: StyledVariantProps<typeof ModalContent>['size'];
};

export const Content = ({
	children,
	className,
	size = 'dialog'
}: PropsWithChildren<ContentProps>) => {
	const { state, underlayProps, modalProps, modalRef, variant } = useAgModal();

	//const entering = useEnterAnimation(modalRef);
	//const exiting = useExitAnimation(modalRef, state.isOpen); // TODO: Exit animation doesn't work well

	return (
		<>
			{state.isOpen && (
				<AriaOverlay>
					<Overlay {...underlayProps}>
						<Dialog role={variant === 'alert' ? 'alertdialog' : 'dialog'}>
							<ModalContent
								size={size}
								{...modalProps}
								ref={modalRef}
								className={className}
								onMouseDown={e => e.stopPropagation()}
								//data-state={entering ? 'open' : exiting ? 'closed' : undefined}
							>
								{children}
							</ModalContent>
						</Dialog>
					</Overlay>
				</AriaOverlay>
			)}
		</>
	);
};
