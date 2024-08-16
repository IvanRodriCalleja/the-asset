import { ReactNode, Suspense } from 'react';

import { GripVertical } from 'lucide-react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { Sortable } from '@theasset/ui/sortable';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { usePdf } from '../infra/usePdf';
import { useThumbnail } from '../infra/useThumbnail';
import { ThumbnailSkeletonMobile } from './thumbnailMobile/ThumbnailSkeletonMobile';

type PdfThumbnailMobileProp = {
	file: TheAssetFile;
	actions?: (props: ActionProps) => ReactNode;
};

export const PdfThumbnailMobile = (props: PdfThumbnailMobileProp) => (
	<Suspense fallback={<ThumbnailSkeletonMobile />}>
		<PdfThumbnail {...props} />
	</Suspense>
);

type ActionProps = {
	file: TheAssetFile;
};

type PdfThumbnailProps = {
	file: TheAssetFile;
	actions?: (props: ActionProps) => ReactNode;
};

const FileName = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs'
	}
});

const PdfThumbnail = ({ file, actions, ...props }: PdfThumbnailProps) => {
	const pdf = usePdf(file);

	const src = useThumbnail({ file, page: 1 });

	//TODO: Add literals for "pages"
	return (
		<Thumbnail.Root width="100%" paddingBottom={0} {...props}>
			<Stack direction="row">
				<Box width="48px">
					<Thumbnail.ImageContent>
						<Thumbnail.Image src={src} alt={file.name} />
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
