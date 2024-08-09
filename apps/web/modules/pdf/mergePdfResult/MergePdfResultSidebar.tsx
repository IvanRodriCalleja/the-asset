import { PropsWithChildren } from 'react';

import { Box } from '@theasset/style-system/jsx';

export const MergePdfResultSidebar = ({ children }: PropsWithChildren) => (
	<Box
		display="flex"
		background="white"
		padding={12}
		borderLeftStyle="solid"
		borderLeftWidth="1px"
		borderLeftColor="border"
		width={{
			base: 'full',
			md: '480px'
		}}>
		{children}
	</Box>
);
