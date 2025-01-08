import { PdfThumbnail } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { styled } from '@theasset/style-system/jsx';

import { useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

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

export const FilePreview = () => {
	const { files, onFileChange } = useSplitPdfStore();

	return (
		<FilePreviewList>
			{files.map(file => (
				<DraggableItem key={file.id}>
					<PdfThumbnail file={file} onFileChange={onFileChange} actions={() => null} />
				</DraggableItem>
			))}
		</FilePreviewList>
	);
};
