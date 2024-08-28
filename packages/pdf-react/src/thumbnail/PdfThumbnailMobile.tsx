import { Dispatch, ReactNode, SetStateAction } from 'react';

import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { getSingularOrPlural } from '@theasset/internationalization/infra';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { Sortable } from '@theasset/ui/sortable';
import { Thumbnail, useThumbnailSuspense } from '@theasset/ui/thumbnail';

import { usePages } from '../infra/usePages';
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
	const { shared } = useLocale();
	const pages = usePages(file);

	const { src } = useThumbnail({ file });

	const { onLoad } = useThumbnailSuspense();

	return (
		<Thumbnail.Root width="100%" paddingBottom={0} {...props}>
			<Stack direction="row">
				<Box width="56px" minWidth="56px">
					<Thumbnail.ImageContent>
						<Thumbnail.Image src={src} alt={file.name} onLoad={onLoad} shadow />
					</Thumbnail.ImageContent>
				</Box>
				<Stack flex={1} justifyContent="center" overflow="hidden">
					<FileName>{file.name}</FileName>
					<Box>
						<Badge>
							{pages} {getSingularOrPlural(shared.page, pages)}
						</Badge>
					</Box>
				</Stack>

				<Flex alignItems="center" minWidth="40px" width="40px">
					<Sortable.SortableDragHandle variant="transparent" size="icon">
						<DragHandleDots2Icon />
					</Sortable.SortableDragHandle>
				</Flex>
			</Stack>

			{actions && actions({ file, setFiles })}
		</Thumbnail.Root>
	);
};
