import { useCache } from '@theasset/cache/useCache';
import { getDocument } from '@theasset/pdf/document';
import { Stack } from '@theasset/style-system/jsx';

import { ScrollViewerPageViewPort } from './scrollViewer/ScrollViewerPageViewPort';

type ScrollViewerProps = {
	hash: string;
	buffer: ArrayBuffer;
};

export const ScrollViewer = ({ hash, buffer }: ScrollViewerProps) => {
	const pdf = useCache({ hash, type: 'pdf' }, () => getDocument({ buffer }));

	return (
		<Stack maxWidth="580px" width="100%" height="max-content">
			{[...new Array(pdf.numPages)].map((_, index) => (
				<ScrollViewerPageViewPort key={index} hash={hash} page={index + 1} pdf={pdf} />
			))}
		</Stack>
	);
};
