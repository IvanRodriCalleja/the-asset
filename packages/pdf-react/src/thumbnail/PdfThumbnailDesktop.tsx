import { Dispatch, ReactNode, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Thumbnail, useThumbnailSuspense } from '@theasset/ui/thumbnail';

import { useThumbnail } from '../infra/useThumbnail';
import { ThumbnailDesktopFooter } from './shared/ThumbnailDesktopFooter';
import { ThumbnailSkeletonDesktop } from './thumbnailDesktop/ThumbnailSkeletonDesktop';

type ThumbnailProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

// TODO: Add error boundary

export const PdfThumbnailDesktop = (props: ThumbnailProps) => {
	return (
		<Thumbnail.Suspense fallback={<ThumbnailSkeletonDesktop />}>
			<PdfThumbnail {...props} />
		</Thumbnail.Suspense>
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
		<Thumbnail.Root width={180} {...props}>
			{actions && actions({ file, setFiles })}

			<Thumbnail.ImageContent>
				<Thumbnail.Image src={src} alt={file.name} onLoad={onLoad} shadow />
			</Thumbnail.ImageContent>

			<ThumbnailDesktopFooter file={file} />
		</Thumbnail.Root>
	);
};
