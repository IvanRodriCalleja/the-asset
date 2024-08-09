import { Suspense } from 'react';

import { PDFDocumentProxy } from 'pdfjs-dist/build/pdf.min.mjs';
import { useInView } from 'react-intersection-observer';

import { Box } from '@theasset/style-system/jsx';

import { ScrollViewerSkeleton } from './ScrollViewerSkeleton';
import { ScrollViewerPage } from './scrollViewerPageViewPort/ScrollViewerPage';

type ScrollViewerPageViewPortProps = {
	page: number;
	hash: string;
	pdf: PDFDocumentProxy;
};

export const ScrollViewerPageViewPort = ({ hash, pdf, page }: ScrollViewerPageViewPortProps) => {
	const [ref, isInViewPort] = useInView({
		// TODO: Fix, rootMargin, not working
		rootMargin: '10000px 0px 0px 0px',
		threshold: 0,
		triggerOnce: true
	});

	return (
		<Box ref={ref} boxShadow="lg">
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
