import { useRef } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Stack } from '@theasset/style-system/jsx';

import { usePdf } from './infra/usePdf';
import { ScrollViewerPageViewPort } from './scrollViewer/ScrollViewerPageViewPort';

type ScrollViewerProps = {
	file: TheAssetFile;
};

export const ScrollViewer = ({ file }: ScrollViewerProps) => {
	const pdf = usePdf(file);

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
				<ScrollViewerPageViewPort key={index} file={file} page={index + 1} rootRef={rootRef} />
			))}
		</Stack>
	);
};
