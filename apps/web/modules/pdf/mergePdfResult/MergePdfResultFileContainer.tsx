import { PropsWithChildren } from 'react';

import { Box } from '@theasset/style-system/jsx';

export const MergePdfResultFileContainer = ({ children }: PropsWithChildren) => (
	<Box display="flex" flex={1} justifyContent="center" height="100%" overflow="auto" padding={16}>
		{children}
	</Box>
);
