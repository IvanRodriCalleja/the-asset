import { Dispatch, ReactNode, SetStateAction } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { FileState } from '@theasset/pdf-tools';
import { Box } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import {
	ThumbnailFooter,
	ThumbnailImage,
	ThumbnailImageContent,
	ThumbnailRoot,
	ThumbnailSuspense,
	useThumbnailSuspense
} from '@theasset/ui/thumbnail';

import { usePages } from '../hooks/usePages';
import { useThumbnail } from '../hooks/useThumbnail';
import { PdfThumbnailErrorDesktop } from './pdfThumbnailDesktop/PdfThumbnailErrorDesktop';
import { ThumbnailSkeletonDesktop } from './pdfThumbnailDesktop/ThumbnailSkeletonDesktop';
import { FileName } from './shared/FileName';

export type ThumbnailProps = {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

export const PdfThumbnailDesktop = (props: ThumbnailProps) => {
	return (
		<ThumbnailSuspense fallback={<ThumbnailSkeletonDesktop />}>
			<ErrorBoundary
				fallbackRender={fallbackProps => (
					<PdfThumbnailErrorDesktop {...fallbackProps} {...props} />
				)}>
				<PdfThumbnail {...props} />
			</ErrorBoundary>
		</ThumbnailSuspense>
	);
};

type ActionProps = {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
};

type PdfThumbnailProps = {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

const PdfThumbnail = ({ file, setFiles, actions, ...props }: PdfThumbnailProps) => {
	const { src, rotation } = useThumbnail({ file });
	const { onLoad } = useThumbnailSuspense();
	const { shared } = useLocale();
	const pages = usePages(file);

	return (
		<ThumbnailRoot width={180} {...props} data-testid="pdf-thumbnail">
			{actions && actions({ file, setFiles })}

			<ThumbnailImageContent>
				<ThumbnailImage src={src} alt={file.name} data-rotation={rotation} onLoad={onLoad} shadow />
			</ThumbnailImageContent>

			<ThumbnailFooter>
				<FileName data-testid="pdf-name">{file.name}</FileName>
				<Box display="flex" justifyContent="center">
					<Badge size="sm" capitalize>
						{pages} {getSingularOrPlural(shared.page, pages)}
					</Badge>
				</Box>
			</ThumbnailFooter>
		</ThumbnailRoot>
	);
};
