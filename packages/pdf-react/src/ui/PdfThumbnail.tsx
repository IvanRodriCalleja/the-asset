import { ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import * as Thumbnail from '@theasset/ui/thumbnail';
import { FileState } from '@theasset/pdf-tools';

import { PdfThumbnailDetail } from './pdfThumbnail/PdfThumbnailDetail';
import { PdfThumbnailError } from './pdfThumbnail/PdfThumbnailError';
import { PdfThumbnailSkeleton } from './pdfThumbnail/PdfThumbnailSkeleton';

export type PdfThumbnailProps<T extends FileState> = {
	file: T;
	shadow?: boolean;
	onFileChange: (id: number, newFile: T) => void;
	actions?: PdfThumbnailAction;
	pageText?: (file: T) => ReactNode;
};

export type PdfThumbnailAction = (props: ActionProps) => ReactNode;

type ActionProps = {
	file: FileState;
	isError: boolean;
};

export const PdfThumbnail = <T extends FileState>(
	props: PdfThumbnailProps<T> & Thumbnail.RootVariants
) => {
	return (
		<Thumbnail.Suspense fallback={<PdfThumbnailSkeleton {...props} />}>
			<ErrorBoundary
				fallbackRender={fallbackProps => <PdfThumbnailError {...fallbackProps} {...props} />}>
				<PdfThumbnailDetail {...props} />
			</ErrorBoundary>
		</Thumbnail.Suspense>
	);
};
