import { css } from '@theasset/style-system/css';
import { Stack, styled } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/text';

import { SplitPdfActions } from './splitPdfSidebar/SplitPdfActions';
import { SplitPdfRanges } from './splitPdfSidebar/SplitPdfRanges';
import { SplitPdfSidebarContent } from './splitPdfSidebar/SplitPdfSidebarContent';

const SplitPdfSidebarContainer = styled('div', {
	base: {
		position: 'relative',
		width: '480px',
		minWidth: '480px',
		height: '100%',
		zIndex: 1
	}
});

// TODO:Repeated from merge result (panel, title, etc)

export const SplitPdfSidebar = () => (
	<SplitPdfSidebarContainer>
		<SplitPdfSidebarContent>
			<Stack flex={1} overflow="auto">
				<h3 className={css({ paddingInline: 12, paddingTop: 12 })}>
					<Text size="2xl">
						<b>Cut your pages in ranges</b>
					</Text>
				</h3>

				<SplitPdfRanges />
				<SplitPdfActions />
			</Stack>
		</SplitPdfSidebarContent>
	</SplitPdfSidebarContainer>
);
