import { HStack } from '@theasset/style-system/jsx';
import { PropsWithChildren } from 'react';

export const Footer = ({ children }: PropsWithChildren) => (
	<HStack alignItems="center" justifyContent="end" flex="0 0 auto">
		{children}
	</HStack>
);
