import { useRef } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Stack } from '@theasset/style-system/jsx';

import { usePages } from './infra/usePages';
import { ScrollViewerPageViewPort } from './scrollViewer/ScrollViewerPageViewPort';

type ScrollViewerProps = {
	file: TheAssetFile;
};

export const ScrollViewer = ({ file }: ScrollViewerProps) => {
	const totalPages = usePages(file);

	const rootRef = useRef<HTMLDivElement>(null);

	return (
		<Stack
			ref={rootRef}
			height="100%"
			width="100%"
			alignItems="center"
			overflow="auto"
			padding={16}>
			{[...new Array(totalPages)].map((_, index) => (
				<ScrollViewerPageViewPort key={index} file={file} page={index} rootRef={rootRef} />
			))}
		</Stack>
	);
};
