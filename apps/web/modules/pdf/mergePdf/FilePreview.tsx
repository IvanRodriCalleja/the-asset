import { Dispatch, SetStateAction } from 'react';

import { PdfThumbnail } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { FileState } from '@theasset/pdf-tools';
import { breakpoints } from '@theasset/style-system/breakpoints';
import { styled } from '@theasset/style-system/jsx';
import { SortableItem, SortableRoot } from '@theasset/ui/sortable';
import { useMediaQuery } from '@theasset/utilities-react/use-media-query';

import { MergePdfThumbnailActions } from './filePreview/MergePdfThumbnailActions';

const FilePreviewList = styled('div', {
	base: {
		display: 'flex',
		flexDirection: {
			base: 'column',
			md: 'row'
		},
		marginInline: 'auto',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
		maxWidth: '100%',
		padding: {
			base: 4,
			md: 16
		},
		gap: 4
	}
});

const DraggableItem = styled('div', {
	base: {
		width: {
			base: '100%',
			md: 'unset'
		}
	}
});

export type FilePreviewProps = {
	files: FileState[];
	setFiles: Dispatch<SetStateAction<FileState[]>>;
};

export const FilePreview = (props: FilePreviewProps) => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	const { files, setFiles } = props;

	return (
		<SortableRoot
			orientation={isDesktop ? 'mixed' : 'vertical'}
			value={files}
			onValueChange={setFiles}>
			<FilePreviewList>
				{files.map(file => (
					<SortableItem key={file.id} value={file.id} asTrigger={isDesktop} asChild>
						<DraggableItem>
							<PdfThumbnail file={file} setFiles={setFiles} actions={MergePdfThumbnailActions} />
						</DraggableItem>
					</SortableItem>
				))}
			</FilePreviewList>
		</SortableRoot>
	);
};
