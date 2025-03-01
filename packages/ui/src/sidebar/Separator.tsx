import { Box } from '@theasset/style-system/jsx';

import { Separator as SeparatorUi } from '../Separator';
import { useSidebar } from './root/SidebarContext';

export const Separator = () => {
	const { isOpen } = useSidebar();

	return isOpen ? (
		<Box
			paddingInline={{
				base: 6,
				sm: 8,
				lg: 12
			}}
			paddingBlock={4}>
			<SeparatorUi orientation="horizontal" />
		</Box>
	) : null;
};
