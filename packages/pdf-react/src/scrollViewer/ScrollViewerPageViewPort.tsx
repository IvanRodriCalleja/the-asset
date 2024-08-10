import { RefObject, Suspense } from 'react';

import { PDFDocumentProxy } from 'pdfjs-dist/build/pdf.min.mjs';

import { Box } from '@theasset/style-system/jsx';
import { useIntersectionObserver } from '@theasset/ui/utils/use-intersection-observer';

import { ScrollViewerSkeleton } from './ScrollViewerSkeleton';
import { ScrollViewerPage } from './scrollViewerPageViewPort/ScrollViewerPage';

type ScrollViewerPageViewPortProps = {
	page: number;
	hash: string;
	pdf: PDFDocumentProxy;
	rootRef: RefObject<HTMLDivElement>;
};

export const ScrollViewerPageViewPort = ({
	hash,
	pdf,
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
		<Box ref={ref} boxShadow="lg" maxWidth="580px" width="100%">
			<Suspense fallback={<ScrollViewerSkeleton />}>
				{isInViewPort ? (
					<ScrollViewerPage page={page} hash={hash} pdf={pdf} />
				) : (
					<ScrollViewerSkeleton />
				)}
			</Suspense>
		</Box>
	);
};
