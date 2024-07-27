import { PropsWithChildren } from 'react';

import { Box } from '@theasset/style-system/jsx';

export const Body = ({ children }: PropsWithChildren) => (
	<Box overflowY="auto" WebkitOverflowScrolling="touch" maxH="60vh">
		{children}
	</Box>
);
