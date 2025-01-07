import { PropsWithChildren } from 'react';

import { Box } from '@theasset/style-system/jsx';

export const MergePdfResultFileContainer = ({ children }: PropsWithChildren) => (
	<Box
		display="flex"
		flex={1}
		height={{
			base: 'calc(100% - 163px)',
			md: '100%'
		}}>
		{children}
	</Box>
);
