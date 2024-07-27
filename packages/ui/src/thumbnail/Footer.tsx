import { PropsWithChildren } from 'react';

import { Stack } from '@theasset/style-system/jsx';

export const Footer = ({ children }: PropsWithChildren) => (
	<Stack overflow="hidden">{children}</Stack>
);
