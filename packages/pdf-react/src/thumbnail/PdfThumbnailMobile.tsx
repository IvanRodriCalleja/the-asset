import { ReactNode, Suspense } from 'react';

import { GripVertical } from 'lucide-react';

import { useCache } from '@theasset/cache/useCache';
import { PdfMergeMetadata } from '@theasset/pdf';
import { getDocument } from '@theasset/pdf/document';
import { getThumbnail } from '@theasset/pdf/thumbnail';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { Sortable } from '@theasset/ui/sortable';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { getScale } from './shared/getScale';
import { ThumbnailSkeletonMobile } from './thumbnailMobile/ThumbnailSkeletonMobile';

type PdfThumbnailMobileProp = {
	file: TheAssetFileItem<PdfMergeMetadata>;
	actions?: (props: ActionProps) => ReactNode;
};

export const PdfThumbnailMobile = (props: PdfThumbnailMobileProp) => (
	<Suspense fallback={<ThumbnailSkeletonMobile />}>
		<PdfThumbnail {...props} />
	</Suspense>
);

type ActionProps = {
	file: TheAssetFileItem<PdfMergeMetadata>;
};

type PdfThumbnailProps = {
	file: TheAssetFileItem<PdfMergeMetadata>;
	actions?: (props: ActionProps) => ReactNode;
};

const FileName = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs'
	}
});

const PdfThumbnail = ({ file, actions, ...props }: PdfThumbnailProps) => {
	const pdf = useCache(`${file.id}-pdf`, () => getDocument({ buffer: file.buffer }));
	const { src, width, height } = useCache(file.id, () => getThumbnail({ pdf }));

	return (
		<Thumbnail.Root width="100%" paddingBottom={0} {...props}>
			<Stack direction="row">
				<Box width="48px">
					<Thumbnail.ImageContent>
						<Thumbnail.Image
							src={src}
							alt={file.name}
							shadow={file.metadata.rotation}
							rotation={file.metadata.rotation}
							scale={getScale(width, height, file.metadata.rotation)}
						/>
					</Thumbnail.ImageContent>
				</Box>
				<Stack flex={1} justifyContent="center">
					<FileName>{file.name}</FileName>
					<Box>
						<Badge>{pdf.numPages} Pages</Badge>
					</Box>
				</Stack>

				<Flex alignItems="center">
					<Sortable.SortableDragHandle variant="transparent" size="icon">
						<GripVertical />
					</Sortable.SortableDragHandle>
				</Flex>
			</Stack>

			{actions && actions({ file })}
		</Thumbnail.Root>
	);
};
