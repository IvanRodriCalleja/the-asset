import { DOMAttributes, ReactNode, RefObject, createContext, useContext, useRef } from 'react';

import { AriaButtonProps } from '@react-types/button';
import { AriaModalOverlayProps, useModalOverlay, useOverlayTrigger } from '@react-aria/overlays';
import {
	OverlayTriggerProps,
	OverlayTriggerState,
	useOverlayTriggerState
} from '@react-stately/overlays';
import { DOMProps, FocusableElement } from '@react-types/shared';

import { Body } from './modal/Body';
import { Overlay } from './modal/Overlay';
import { Footer } from './modal/Footer';
import { Trigger } from './modal/Trigger';

type ModalRootChildrenProps = {
	close: () => void;
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
	modalRef: { current: null },
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

export const Root = ({ children, variant = 'dialog', ...props }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const state = useOverlayTriggerState(props);
	const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state);

	const { modalProps, underlayProps } = useModalOverlay(
		{ ...props, isDismissable: variant === 'dialog' },
		state,
		modalRef
	);

	const childrenProps: ModalRootChildrenProps = {
		close: state.close
	};

	return (
		<ModalContext.Provider
			value={{ triggerProps, underlayProps, state, modalProps, overlayProps, modalRef, variant }}>
			{typeof children === 'function' ? children(childrenProps) : children}
		</ModalContext.Provider>
	);
};

export const Modal = {
	Root,
	Overlay,
	Trigger,
	Body,
	Footer
};
