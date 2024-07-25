import { useCache } from '@theasset/cache/useCache';

import { Box, Stack, styled } from '@theasset/style-system/jsx';
import { ThumbnailImage } from './thumbnailContent/ThumbnailImage';
import { getDocument } from '@theasset/pdf/document';
import { Badge } from '@theasset/ui/badge';
import { ThumbnailActions } from './thumbnailContent/ThumbnailActions';
import { PdfMergeMetadata } from '@theasset/pdf';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { SetStateAction, Dispatch } from 'react';

const FileInfo = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs'
	}
});

type ThumbnailContentProps = {
	id: string;
	buffer: Uint8Array;
	name: string;
	index: number;
	metadata: PdfMergeMetadata;
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

const ThumbnailContentContainer = styled(Stack, {
	base: {
		position: 'relative',
		padding: 4,
		gap: 2,

		'& [data-part="actions"]': {
			opacity: 0,
			transition: 'opacity 0.2s ease-in-out'
		},
		'&:hover [data-part="actions"]': {
			opacity: 1
		}
	}
});

export const ThumbnailContent = ({
	id,
	buffer,
	name,
	index,
	metadata,
	setFiles
}: ThumbnailContentProps) => {
	const pdf = useCache(`${id}-pdf`, () => getDocument({ buffer }));

	return (
		<ThumbnailContentContainer>
			<ThumbnailActions index={index} setFiles={setFiles} />

			<div
				style={{
					transform: `rotate(${metadata.rotation}deg) ${metadata.rotation % 180 === 0 ? '' : 'scale(0.704225)'}`
				}}>
				<ThumbnailImage pdf={pdf} id={id} name={name} />
			</div>

			<Stack overflow="hidden">
				<FileInfo>{name}</FileInfo>
				<Box display="flex" justifyContent="center">
					<Badge size="sm">{pdf.numPages} Pages</Badge>
				</Box>
			</Stack>
		</ThumbnailContentContainer>
	);
};
