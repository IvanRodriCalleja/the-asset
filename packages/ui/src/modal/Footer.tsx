import { PropsWithChildren } from 'react';

import { HStack } from '@theasset/style-system/jsx';

export const Footer = ({ children }: PropsWithChildren) => (
	<HStack alignItems="center" justifyContent="end" flex="0 0 auto">
		{children}
	</HStack>
);
