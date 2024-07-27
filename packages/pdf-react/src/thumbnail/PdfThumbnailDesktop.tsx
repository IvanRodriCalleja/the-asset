import { ReactNode, Suspense } from 'react';

import { useCache } from '@theasset/cache/useCache';
import { PdfMergeMetadata } from '@theasset/pdf';
import { getDocument } from '@theasset/pdf/document';
import { getThumbnail } from '@theasset/pdf/thumbnail';
import { Box, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { getScale } from './shared/getScale';
import { ThumbnailSkeletonDesktop } from './thumbnailDesktop/ThumbnailSkeletonDesktop';

type ThumbnailProps = {
	file: TheAssetFileItem<PdfMergeMetadata>;
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
	file: TheAssetFileItem<PdfMergeMetadata>;
};

type PdfThumbnailProps = {
	file: TheAssetFileItem<PdfMergeMetadata>;
	actions?: (props: ActionProps) => ReactNode;
};

const PdfThumbnail = ({ file, actions, ...props }: PdfThumbnailProps) => {
	const pdf = useCache(`${file.id}-pdf`, () => getDocument({ buffer: file.buffer }));
	const { src, width, height } = useCache(file.id, () => getThumbnail({ pdf }));

	return (
		<Thumbnail.Root width={180} {...props}>
			{actions && actions({ file })}

			<Thumbnail.ImageContent>
				<Thumbnail.Image
					src={src}
					alt={file.name}
					shadow={file.metadata.rotation}
					rotation={file.metadata.rotation}
					scale={getScale(width, height, file.metadata.rotation)}
				/>
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
