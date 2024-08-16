import { Dispatch, ReactNode, SetStateAction, Suspense } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { usePdf } from '@theasset/pdf-react/usePdf';
import { Box, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { Thumbnail } from '@theasset/ui/thumbnail';

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
		<Suspense fallback={<ThumbnailSkeletonDesktop />}>
			<PdfThumbnail {...props} />
		</Suspense>
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

const PdfThumbnail = ({ file, actions, setFiles, ...props }: PdfThumbnailProps) => {
	const pdf = usePdf(file);

	const src = useThumbnail({ file, page: 1 });

	return (
		<Thumbnail.Root width={180} {...props}>
			{actions && actions({ file, setFiles })}

			<Thumbnail.ImageContent>
				<Thumbnail.Image src={src} alt={file.name} />
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
