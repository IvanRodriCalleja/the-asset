import { ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import * as Thumbnail from '@theasset/ui/thumbnail';
import { FileState } from '@theasset/pdf-tools';

import { PdfThumbnailDetail } from './pdfThumbnail/PdfThumbnailDetail';
import { PdfThumbnailError } from './pdfThumbnail/PdfThumbnailError';
import { PdfThumbnailSkeleton } from './pdfThumbnail/PdfThumbnailSkeleton';

export type PdfThumbnailProps = {
	file: FileState;
	onFileChange: (id: string, newFile: FileState) => void;
	actions?: PdfThumbnailAction;
};

export type PdfThumbnailAction = (props: ActionProps) => ReactNode;

type ActionProps = {
	file: FileState;
	isError: boolean;
};

export const PdfThumbnail = (props: PdfThumbnailProps) => {
	return (
		<Thumbnail.Suspense fallback={<PdfThumbnailSkeleton {...props} />}>
			<ErrorBoundary
				fallbackRender={fallbackProps => <PdfThumbnailError {...fallbackProps} {...props} />}>
				<PdfThumbnailDetail {...props} />
			</ErrorBoundary>
		</Thumbnail.Suspense>
	);
};
