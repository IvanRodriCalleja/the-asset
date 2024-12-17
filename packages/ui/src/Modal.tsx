import { DOMAttributes, ReactNode, RefObject, createContext, useContext, useRef } from 'react';

import { AriaModalOverlayProps, useModalOverlay, useOverlayTrigger } from '@react-aria/overlays';
import {
	OverlayTriggerProps,
	OverlayTriggerState,
	useOverlayTriggerState
} from '@react-stately/overlays';
import { AriaButtonProps } from '@react-types/button';
import { DOMProps, FocusableElement } from '@react-types/shared';

export { Close as ModalClose } from './modal/Close';
export { Content as ModalContent } from './modal/Content';
export { Description as ModalDescription } from './modal/Description';
export { Footer as ModalFooter } from './modal/Footer';
export { Header as ModalHeader } from './modal/Header';
export { Title as ModalTitle } from './modal/Title';
export { Trigger as ModalTrigger } from './modal/Trigger';

export { Body as ModalBody } from './modal/Body';

type ModalRootChildrenProps = {
	close: () => void;
	open: () => void;
};

type ModalVariant = 'alert' | 'dialog';
type ModalProps = OverlayTriggerProps &
	AriaModalOverlayProps & {
		children: ReactNode | ((props: ModalRootChildrenProps) => ReactNode);
		variant?: ModalVariant;
	};

type ModalContextValue = {
	triggerProps: AriaButtonProps;
	overlayProps: DOMProps;
	underlayProps: DOMAttributes<FocusableElement>;
	modalProps: DOMAttributes<FocusableElement>;
	modalRef: RefObject<HTMLDivElement>;
	state: OverlayTriggerState;
	variant: ModalVariant;
};

const ModalContext = createContext<ModalContextValue>({
	triggerProps: {},
	underlayProps: {},
	modalProps: {},
	overlayProps: {},
	modalRef: { current: null as unknown as HTMLDivElement },
	state: {
		isOpen: false,
		open: () => {},
		close: () => {},
		toggle: () => {},
		setOpen: () => {}
	},
	variant: 'dialog'
});

export const useAgModal = () => useContext(ModalContext);

export const ModalRoot = ({ children, variant = 'dialog', ...props }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null!);
	const state = useOverlayTriggerState(props);
	const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state);

	const { modalProps, underlayProps } = useModalOverlay(
		{ ...props, isDismissable: variant === 'dialog' },
		state,
		modalRef
	);

	const childrenProps: ModalRootChildrenProps = {
		close: state.close,
		open: state.open
	};

	return (
		<ModalContext.Provider
			value={{ triggerProps, underlayProps, state, modalProps, overlayProps, modalRef, variant }}>
			{typeof children === 'function' ? children(childrenProps) : children}
		</ModalContext.Provider>
	);
};
