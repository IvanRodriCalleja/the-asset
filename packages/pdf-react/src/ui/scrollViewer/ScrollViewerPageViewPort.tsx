import { RefObject, Suspense } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Box } from '@theasset/style-system/jsx';
import { useIntersectionObserver } from '@theasset/ui/utils/use-intersection-observer';

import { ScrollViewerSkeleton } from './ScrollViewerSkeleton';
import { ScrollViewerPage } from './scrollViewerPageViewPort/ScrollViewerPage';

type ScrollViewerPageViewPortProps = {
	page: number;
	file: TheAssetFile;
	rootRef: RefObject<HTMLDivElement>;
};

export const ScrollViewerPageViewPort = ({
	file,
	page,
	rootRef
}: ScrollViewerPageViewPortProps) => {
	const [ref, isInViewPort] = useIntersectionObserver(
		{
			rootMargin: '5000px 0px 5000px 0px',
			threshold: 0
		},
		{ initialInView: page < 5 },
		rootRef
	);

	return (
		<Box ref={ref} boxShadow="lg" maxWidth="580px" width="100%" data-testid="scroll-viewer-page">
			<Suspense fallback={<ScrollViewerSkeleton />}>
				{isInViewPort ? <ScrollViewerPage page={page} file={file} /> : <ScrollViewerSkeleton />}
			</Suspense>
		</Box>
	);
};
