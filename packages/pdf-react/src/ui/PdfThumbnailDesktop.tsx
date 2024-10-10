import { Dispatch, ReactNode, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import {
	ThumbnailImage,
	ThumbnailImageContent,
	ThumbnailRoot,
	ThumbnailSuspense,
	useThumbnailSuspense
} from '@theasset/ui/thumbnail';

import { useThumbnail } from '../hooks/useThumbnail';
import { ThumbnailSkeletonDesktop } from './pdfThumbnailDesktop/ThumbnailSkeletonDesktop';
import { ThumbnailDesktopFooter } from './shared/ThumbnailDesktopFooter';

type ThumbnailProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

// TODO: Add error boundary

export const PdfThumbnailDesktop = (props: ThumbnailProps) => {
	return (
		<ThumbnailSuspense fallback={<ThumbnailSkeletonDesktop />}>
			<PdfThumbnail {...props} />
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
	const { src } = useThumbnail({ file });
	const { onLoad } = useThumbnailSuspense();

	return (
		<ThumbnailRoot width={180} {...props} data-testid="pdf-thumbnail">
			{actions && actions({ file, setFiles })}

			<ThumbnailImageContent>
				<ThumbnailImage src={src} alt={file.name} onLoad={onLoad} shadow />
			</ThumbnailImageContent>

			<ThumbnailDesktopFooter file={file} />
		</ThumbnailRoot>
	);
};
