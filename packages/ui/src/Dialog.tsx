import { DOMAttributes, PropsWithChildren, createContext, useContext, useRef } from 'react';

import { AriaDialogProps, useDialog } from '@react-aria/dialog';
import { FocusableElement } from '@react-types/shared';

import { Box } from '@theasset/style-system/jsx';

type DialogProps = AriaDialogProps & {};

type DialogContextValue = {
	titleProps: DOMAttributes<FocusableElement>;
};

export const useAgDialog = () => useContext(DialogContext);

const DialogContext = createContext<DialogContextValue>({
	titleProps: {}
});

export const Dialog = ({ children, ...props }: PropsWithChildren<DialogProps>) => {
	const ref = useRef(null);
	const { dialogProps, titleProps } = useDialog(
		{
			...props,
			role: 'alertdialog'
		},
		ref
	);

	return (
		<DialogContext.Provider value={{ titleProps }}>
			<Box {...dialogProps} ref={ref} outline="none">
				{children}
			</Box>
		</DialogContext.Provider>
	);
};
