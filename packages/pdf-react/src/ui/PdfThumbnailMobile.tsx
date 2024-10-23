import { Dispatch, ReactNode, SetStateAction } from 'react';

import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { SortableDragHandle } from '@theasset/ui/sortable';
import {
	ThumbnailImage,
	ThumbnailImageContent,
	ThumbnailRoot,
	ThumbnailSuspense,
	useThumbnailSuspense
} from '@theasset/ui/thumbnail';

import { usePages } from '../hooks/usePages';
import { useThumbnail } from '../hooks/useThumbnail';
import { ThumbnailSkeletonMobile } from './pdfThumbnailMobile/ThumbnailSkeletonMobile';

type PdfThumbnailMobileProp = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	actions?: (props: ActionProps) => ReactNode;
};

export const PdfThumbnailMobile = (props: PdfThumbnailMobileProp) => (
	<ThumbnailSuspense fallback={<ThumbnailSkeletonMobile />}>
		<PdfThumbnail {...props} />
	</ThumbnailSuspense>
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

	const { src, rotation } = useThumbnail({ file });

	const { onLoad } = useThumbnailSuspense();

	return (
		<ThumbnailRoot width="100%" paddingBottom={0} {...props} data-testid="pdf-thumbnail">
			<Stack direction="row">
				<Box width="56px" minWidth="56px">
					<ThumbnailImageContent>
						<ThumbnailImage
							src={src}
							data-rotation={rotation}
							alt={file.name}
							onLoad={onLoad}
							shadow
						/>
					</ThumbnailImageContent>
				</Box>
				<Stack flex={1} justifyContent="center" overflow="hidden">
					<FileName data-testid="pdf-name">{file.name}</FileName>
					<Box>
						<Badge>
							{pages} {getSingularOrPlural(shared.page, pages)}
						</Badge>
					</Box>
				</Stack>

				<Flex alignItems="center" minWidth="40px" width="40px">
					<SortableDragHandle variant="transparent" size="icon">
						<DragHandleDots2Icon />
					</SortableDragHandle>
				</Flex>
			</Stack>

			{actions && actions({ file, setFiles })}
		</ThumbnailRoot>
	);
};
