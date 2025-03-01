import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Sidebar } from '@theasset/ui/sidebar';

import { SplitPdfActions } from './splitPdfSidebar/SplitPdfActions';
import { SplitPdfRanges } from './splitPdfSidebar/SplitPdfRanges';

export const SplitPdfSidebar = () => {
	const { splitPdf } = useLocale();

	return (
		<Sidebar.Root>
			<Sidebar.Body>
				<Sidebar.Title>{splitPdf.sidebar.title}</Sidebar.Title>
				<Sidebar.Content variant="full">
					<SplitPdfRanges />
				</Sidebar.Content>
			</Sidebar.Body>
			<Sidebar.Separator />
			<Sidebar.Footer>
				<SplitPdfActions />
			</Sidebar.Footer>
		</Sidebar.Root>
	);
};
