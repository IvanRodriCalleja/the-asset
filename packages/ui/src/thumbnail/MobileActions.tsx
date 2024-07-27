import { Stack } from '@theasset/style-system/jsx';
import { PropsWithChildren } from 'react';

export const MobileActions = ({ children }: PropsWithChildren) => (
	<Stack direction="row" borderTop="1px solid #d9d3f1">
		{children}
	</Stack>
);
