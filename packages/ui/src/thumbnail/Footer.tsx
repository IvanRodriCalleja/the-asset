import { Stack } from '@theasset/style-system/jsx';
import { PropsWithChildren } from 'react';

export const Footer = ({ children }: PropsWithChildren) => (
	<Stack overflow="hidden">{children}</Stack>
);
