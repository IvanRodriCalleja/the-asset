import { Box } from '@theasset/style-system/jsx';
import { PropsWithChildren } from 'react';

export const Body = ({ children }: PropsWithChildren) => (
	<Box overflowY="auto" WebkitOverflowScrolling="touch" maxH="60vh">
		{children}
	</Box>
);
