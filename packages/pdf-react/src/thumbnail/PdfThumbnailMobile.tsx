import { Dispatch, ReactNode, SetStateAction } from 'react';

import { GripVertical } from 'lucide-react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { usePdf } from '@theasset/pdf-react/infra/usePdf';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { Sortable } from '@theasset/ui/sortable';
import { Thumbnail, useThumbnailSuspense } from '@theasset/ui/thumbnail';

import { useThumbnail } from '../infra/useThumbnail';
import { ThumbnailSkeletonMobile } from './thumbnailMobile/ThumbnailSkeletonMobile';

type PdfThumbnailMobileProp = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

export const PdfThumbnailMobile = (props: PdfThumbnailMobileProp) => (
	<Thumbnail.Suspense fallback={<ThumbnailSkeletonMobile />}>
		<PdfThumbnail {...props} />
	</Thumbnail.Suspense>
);

type ActionProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

type PdfThumbnailProps = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

const FileName = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs'
	}
});

const PdfThumbnail = ({ file, setFiles, actions, ...props }: PdfThumbnailProps) => {
	const pdf = usePdf(file);
	const { src } = useThumbnail({ file });

	const { onLoad } = useThumbnailSuspense();

	return (
		<Thumbnail.Root width="100%" paddingBottom={0} {...props}>
			<Stack direction="row">
				<Box width="48px">
					<Thumbnail.ImageContent>
						<Thumbnail.Image src={src} alt={file.name} onLoad={onLoad} shadow />
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

			{actions && actions({ file, setFiles })}
		</Thumbnail.Root>
	);
};
