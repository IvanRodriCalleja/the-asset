import { useRef } from 'react';

import { FileState } from '@theasset/pdf-tools';
import { Stack } from '@theasset/style-system/jsx';

import { usePages } from '../hooks/usePages';
import { ScrollViewerPageViewPort } from './scrollViewer/ScrollViewerPageViewPort';

type ScrollViewerProps = {
	file: FileState;
};

export const ScrollViewer = ({ file }: ScrollViewerProps) => {
	const totalPages = usePages(file);

	const rootRef = useRef<HTMLDivElement>(null!);

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
