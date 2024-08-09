import { PropsWithChildren, RefObject, cloneElement, createContext, use, useRef } from 'react';

import {
	Overlay as AriaOverlay,
	AriaPopoverProps,
	DismissButton,
	OverlayTriggerAria,
	useOverlayTrigger,
	usePopover
} from '@react-aria/overlays';
import {
	OverlayTriggerProps,
	OverlayTriggerState,
	useOverlayTriggerState
} from '@react-stately/overlays';

import { styled } from '@theasset/style-system/jsx';

import { useEnterAnimation, useExitAnimation } from './utils';

type PopoverContextValue = {
	state: OverlayTriggerState;
	trigger: OverlayTriggerAria;
	triggerRef: RefObject<HTMLButtonElement>;
	popoverRef: RefObject<HTMLDivElement>;
};

const PopoverContext = createContext<PopoverContextValue>({
	state: {
		isOpen: false,
		open: () => {},
		close: () => {},
		toggle: () => {},
		setOpen: () => {}
	},
	trigger: {
		overlayProps: {},
		triggerProps: {}
	},
	triggerRef: { current: null },
	popoverRef: { current: null }
});

const useThePopover = () => use(PopoverContext);

type RootProps = OverlayTriggerProps;

const Root = ({ children, ...props }: PropsWithChildren<RootProps>) => {
	const popoverRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const state = useOverlayTriggerState(props);
	const trigger = useOverlayTrigger({ type: 'dialog' }, state, triggerRef);

	return (
		<PopoverContext.Provider value={{ state, trigger, triggerRef, popoverRef }}>
			{children}
		</PopoverContext.Provider>
	);
};

type PanelProps = Omit<AriaPopoverProps, 'triggerRef' | 'popoverRef'>;

const Content = styled('div', {
	base: {
		zIndex: 50,
		rounded: 'md',
		border: 'base',
		bg: 'popover',
		p: '4',
		color: 'popover.foreground',
		boxShadow: 'md',
		outline: 'none',

		'&[data-entering]': {
			animateIn: true,
			fadeIn: 0,
			zoomIn: 95
		},

		'&[data-exiting]': {
			animateOut: true,
			fadeOut: 0,
			zoomOut: 95
		},

		'&[data-side=top]': {
			slideInFromBottom: '2'
		},

		'&[data-side=bottom]': {
			slideInFromTop: '2'
		},

		'&[data-side=left]': {
			slideInFromRight: '2'
		},

		'&[data-side=right]': {
			slideInFromLeft: '2'
		}
	}
});

const Panel = (props: PropsWithChildren<PanelProps>) => {
	const { state, popoverRef } = useThePopover();

	const isExiting = useExitAnimation(popoverRef, state.isOpen) || false;

	if (state && !state.isOpen && !isExiting) {
		return null;
	}

	return <InnerPanel {...props} isExiting={isExiting} />;
};

type InnerPanelProps = PanelProps & {
	isExiting: boolean;
};

const InnerPanel = ({
	children,
	offset = 8,
	isExiting,
	...props
}: PropsWithChildren<InnerPanelProps>) => {
	const { state, triggerRef, popoverRef } = useThePopover();
	const { popoverProps, underlayProps, placement } = usePopover(
		{
			...props,
			offset,
			popoverRef,
			triggerRef
		},
		state
	);

	const isEntering = useEnterAnimation(popoverRef, !!placement) || false;

	return (
		<>
			<AriaOverlay>
				<div {...underlayProps}>
					<Content
						{...popoverProps}
						ref={popoverRef}
						data-side={placement}
						data-entering={isEntering || undefined}
						data-exiting={isExiting || undefined}>
						{children}
						<DismissButton onDismiss={state.close} />
					</Content>
				</div>
			</AriaOverlay>
		</>
	);
};

type TriggerProps = {
	children: JSX.Element;
};

const Trigger = ({ children }: TriggerProps) => {
	const {
		trigger: { triggerProps },
		triggerRef
	} = useThePopover();

	return <>{cloneElement(children, { ...triggerProps, ref: triggerRef })}</>;
};

export const Popover = {
	Root,
	Panel,
	Trigger
};
