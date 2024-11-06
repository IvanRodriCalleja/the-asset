import { Dispatch, ReactNode, SetStateAction } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import {
	ThumbnailImage,
	ThumbnailImageContent,
	ThumbnailRoot,
	ThumbnailSuspense,
	useThumbnailSuspense
} from '@theasset/ui/thumbnail';

import { useThumbnail } from '../hooks/useThumbnail';
import { PdfThumbnailErrorDesktop } from './pdfThumbnailDesktop/PdfThumbnailErrorDesktop';
import { ThumbnailSkeletonDesktop } from './pdfThumbnailDesktop/ThumbnailSkeletonDesktop';
import { ThumbnailDesktopFooter } from './shared/ThumbnailDesktopFooter';

export type ThumbnailProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
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
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

type PdfThumbnailProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

const PdfThumbnail = ({ file, setFiles, actions, ...props }: PdfThumbnailProps) => {
	const { src, rotation } = useThumbnail({ file });
	const { onLoad } = useThumbnailSuspense();

	return (
		<ThumbnailRoot width={180} {...props} data-testid="pdf-thumbnail">
			{actions && actions({ file, setFiles })}

			<ThumbnailImageContent>
				<ThumbnailImage src={src} alt={file.name} data-rotation={rotation} onLoad={onLoad} shadow />
			</ThumbnailImageContent>

			<ThumbnailDesktopFooter file={file} />
		</ThumbnailRoot>
	);
};
