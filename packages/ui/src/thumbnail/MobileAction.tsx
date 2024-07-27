import { styled } from '@theasset/style-system/jsx';
import { Button, ButtonProps } from '../Button';
import { PropsWithChildren } from 'react';

const Action = styled(Button, {
	base: {
		display: 'flex',
		flex: 1
	}
});

export const MobileAction = ({ children, ...props }: PropsWithChildren<ButtonProps>) => (
	<Action variant="transparent" {...props}>
		{children}
	</Action>
);
