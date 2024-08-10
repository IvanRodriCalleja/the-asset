import { useRef } from 'react';

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

	const rootRef = useRef<HTMLDivElement>(null);

	return (
		<Stack
			ref={rootRef}
			height="100%"
			width="100%"
			alignItems="center"
			overflow="auto"
			padding={16}>
			{[...new Array(pdf.numPages)].map((_, index) => (
				<ScrollViewerPageViewPort
					key={index}
					hash={hash}
					page={index + 1}
					pdf={pdf}
					rootRef={rootRef}
				/>
			))}
		</Stack>
	);
};
