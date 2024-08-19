import { Dispatch, ReactNode, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Box, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { Thumbnail, useThumbnailSuspense } from '@theasset/ui/thumbnail';

import { usePdf } from '../infra/usePdf';
import { useThumbnail } from '../infra/useThumbnail';
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

const FileName = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs',
		textAlign: 'center'
	}
});

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
	const pdf = usePdf(file);
	const { src } = useThumbnail({ file });

	const { onLoad } = useThumbnailSuspense();

	return (
		<Thumbnail.Root width={180} {...props}>
			{actions && actions({ file, setFiles })}

			<Thumbnail.ImageContent>
				<Thumbnail.Image src={src} alt={file.name} onLoad={onLoad} shadow />
			</Thumbnail.ImageContent>

			<Thumbnail.Footer>
				<FileName>{file.name}</FileName>
				<Box display="flex" justifyContent="center">
					<Badge size="sm">{pdf.numPages} Pages</Badge>
				</Box>
			</Thumbnail.Footer>
		</Thumbnail.Root>
	);
};
